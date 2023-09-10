import '@tourneyview/renderer/css/base.css';
import './example.css';

import { BattlefyImporter } from '../packages/importer/lib';
import { D3BracketAnimator } from '../packages/renderer/lib';
import { BracketRenderer } from '../packages/renderer/lib';
import {
    BracketQueryOption,
    BracketQueryParameter,
    BracketQuerySelectParameter
} from '../packages/importer/lib/types/BracketQuery';
import { BattlefyImportOpts } from '../packages/importer/lib/BattlefyImporter';

const renderer = new BracketRenderer({
    animator: new D3BracketAnimator(),
    swissOpts: {
        useScrollMask: true
    }
});
const importer = new BattlefyImporter();

const bracketQueryContainer = document.getElementById('bracket-query-container');
const tournamentIdInput = document.getElementById('tournament-id-input') as HTMLInputElement;
document.getElementById('tournament-id-submit').addEventListener('click', async () => {
    const data = await importer.getBracketQuery(tournamentIdInput.value);
    data.forEach(param => {
        addBracketQueryParameter(param);
    });
});

document.getElementById('bracket-query-submit').addEventListener('click', async () => {
    const query = buildBracketQuery();
    await renderer.setData(await importer.getMatches(query));
});

function buildBracketQuery(): BattlefyImportOpts {
    const result: Record<string, string> = { };
    const paramElements = bracketQueryContainer.querySelectorAll('*:not(.bracket-query-input-wrapper)[data-key]');
    paramElements.forEach((paramElement: HTMLInputElement | HTMLSelectElement) => {
        result[paramElement.dataset.key] = paramElement.value;
    });

    return result as unknown as BattlefyImportOpts;
}

function deleteChildParameters(paramKey: string) {
    if (paramKey == null) {
        return;
    }

    const params = document.querySelectorAll(`.bracket-query-input-wrapper[data-parent-param-key="${paramKey}"]`);
    params.forEach(param => {
         deleteChildParameters((param as HTMLElement).dataset.key);
         param.parentNode.removeChild(param);
    });
}

function onSelectChange(select: HTMLSelectElement, param: BracketQuerySelectParameter) {
    deleteChildParameters(param.key);
    if (select.selectedOptions.length !== 1) {
        return;
    }
    const optionData = select.selectedOptions[0]['__TOURNEYVIEW_OPTION_DATA'] as BracketQueryOption;
    optionData.params.forEach(optionParam => {
        addBracketQueryParameter(optionParam, param.key);
    });
}

function addBracketQueryParameter(param: BracketQueryParameter, parentParamKey?: string) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('bracket-query-input-wrapper');
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
        bracketQueryContainer.appendChild(wrapper);
    } else if (param.type === 'select') {
        const select = document.createElement('select');
        select.id = id;
        select.dataset.key = param.key;
        param.options.forEach(option => {
            const optionElem = document.createElement('option');
            optionElem.value = option.value;
            optionElem.innerText = option.name;
            optionElem['__TOURNEYVIEW_OPTION_DATA'] = option;
            select.options.add(optionElem);
        });
        select.addEventListener('change', event => {
            onSelectChange(event.target as HTMLSelectElement, param);
        });
        wrapper.appendChild(select);
        bracketQueryContainer.appendChild(wrapper);
        onSelectChange(select, param);
    }
}

renderer.element.style.height = '500px';
renderer.element.style.width = '500px';
renderer.element.style.resize = 'both';
renderer.element.style.border = '1px solid red';
document.body.appendChild(renderer.element);
