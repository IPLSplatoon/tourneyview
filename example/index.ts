import '@tourneyview/renderer/css/base.css';
import './example.css';
import { BracketRenderer, D3BracketAnimator } from '../packages/renderer/lib';
import {
    MatchQueryOption,
    MatchQueryParameter,
    MatchQuerySelectParameter
} from '../packages/importer/lib/types/MatchQuery';
import { StartggImporter, BattlefyImporter } from '../packages/importer/lib';
import type { MatchImporter } from '../packages/importer/lib';

const renderer = new BracketRenderer({
    animator: new D3BracketAnimator(),
    swissOpts: {
        useScrollMask: true
    }
});

const apiKeyInput = <HTMLInputElement>document.getElementById('api-key-input');
const apiKeyInputWrapper = <HTMLDivElement>document.getElementById('api-key-input-wrapper');
const sourceInput = <HTMLSelectElement>document.getElementById('tournament-source-input');

function checkSource() {
    apiKeyInputWrapper.style.display = sourceInput.value === 'startgg' ? 'block' : 'none';
}

sourceInput.addEventListener('change', checkSource);
checkSource();

function getImporter(): MatchImporter<unknown> {
    switch (sourceInput.value) {
        case 'startgg':
            return new StartggImporter(apiKeyInput.value);
        case 'battlefy':
            return new BattlefyImporter();
        default:
            throw new Error(`Unknown source ${sourceInput.value}`);
    }
}

const matchQueryContainer = document.getElementById('match-query-container');
const tournamentIdInput = document.getElementById('tournament-id-input') as HTMLInputElement;
document.getElementById('tournament-id-submit').addEventListener('click', async () => {
    const importer = getImporter();
    const data = await importer.getMatchQueryOptions(tournamentIdInput.value);
    Array.from(matchQueryContainer.children).forEach(child => {
        if (child.classList.contains('match-query-input-wrapper')) {
            matchQueryContainer.removeChild(child);
        }
    });
    data.forEach(param => {
        addBracketQueryParameter(param);
    });
});

document.getElementById('match-query-submit').addEventListener('click', async () => {
    const query = buildBracketQuery();
    const importer = getImporter();
    await renderer.setData(await importer.getMatches(query));
});

function buildBracketQuery(): Record<string, string | number> {
    const result: Record<string, string | number> = { };
    const paramElements = matchQueryContainer.querySelectorAll('*:not(.match-query-input-wrapper)[data-key]');
    paramElements.forEach((paramElement: HTMLInputElement | HTMLSelectElement) => {
        if (paramElement.tagName === 'SELECT') {
            result[paramElement.dataset.key] = ((paramElement as HTMLSelectElement).selectedOptions[0]['__TOURNEYVIEW_OPTION_DATA'] as MatchQueryOption).value;
        } else {
            result[paramElement.dataset.key] = paramElement.value;
        }
    });

    return result;
}

function deleteChildParameters(paramKey: string) {
    if (paramKey == null) {
        return;
    }

    const params = document.querySelectorAll(`.match-query-input-wrapper[data-parent-param-key="${paramKey}"]`);
    params.forEach(param => {
         deleteChildParameters((param as HTMLElement).dataset.key);
         param.parentNode.removeChild(param);
    });
}

async function onSelectChange(select: HTMLSelectElement, param: MatchQuerySelectParameter) {
    deleteChildParameters(param.key);
    if (select.selectedOptions.length !== 1) {
        return;
    }
    const optionData = select.selectedOptions[0]['__TOURNEYVIEW_OPTION_DATA'] as MatchQueryOption;
    if (optionData.getParams) {
        (await optionData.getParams()).forEach(optionParam => {
            addBracketQueryParameter(optionParam, param.key);
        });
    }
}

function addBracketQueryParameter(param: MatchQueryParameter, parentParamKey?: string) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('match-query-input-wrapper');
    if (parentParamKey) {
        wrapper.dataset.parentParamKey = parentParamKey;
        wrapper.dataset.key = param.key;
    }
    const id = `tournament-query_${param.key}`;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = param.name;
    wrapper.appendChild(label);

    if (param.type === 'numberRange') {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = String(param.min);
        input.max = String(param.max);
        input.value = String(param.min);
        input.id = id;
        input.dataset.key = param.key;
        wrapper.appendChild(input);
        matchQueryContainer.appendChild(wrapper);
    } else if (param.type === 'select') {
        const select = document.createElement('select');
        select.id = id;
        select.dataset.key = param.key;
        param.options.forEach(option => {
            const optionElem = document.createElement('option');
            optionElem.value = String(option.value);
            optionElem.innerText = option.name;
            optionElem['__TOURNEYVIEW_OPTION_DATA'] = option;
            select.options.add(optionElem);
        });
        select.addEventListener('change', event => {
            onSelectChange(event.target as HTMLSelectElement, param);
        });
        wrapper.appendChild(select);
        matchQueryContainer.appendChild(wrapper);
        onSelectChange(select, param);
    }
}

renderer.element.style.height = '500px';
renderer.element.style.width = '500px';
renderer.element.style.resize = 'both';
renderer.element.style.border = '1px solid red';
document.body.appendChild(renderer.element);
