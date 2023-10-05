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
import { Bracket } from '@tourneyview/common';
import { ClipboardImporter } from './scripts/ClipboardImporter';
import { TextInputImporter } from './scripts/TextInputImporter';

import './scripts/SourceHandler';

const renderer = new BracketRenderer({
    animator: new D3BracketAnimator(),
    swissOpts: {
        useScrollMask: true
    }
});

const sourceSelect = <HTMLSelectElement>document.getElementById('tournament-source-input');
const matchQueryContainer = document.getElementById('match-query-container')!;
const apiKeyInput = <HTMLInputElement>document.getElementById('api-key-input');

function getImporter(): MatchImporter<unknown> {
    switch (sourceSelect.value) {
        case 'startgg':
            return new StartggImporter(apiKeyInput.value);
        case 'battlefy':
            return new BattlefyImporter();
        case 'clipboard':
            return new ClipboardImporter();
        case 'input':
            return new TextInputImporter();
        default:
            throw new Error(`Unknown source ${sourceSelect.value}`);
    }
}

const tournamentIdInput = document.getElementById('tournament-id-input') as HTMLInputElement;
document.getElementById('tournament-id-submit')!.addEventListener('click', async () => {
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

const copyLoadedDataBtn = <HTMLButtonElement>document.getElementById('copy-loaded-data');
let copyLoadedDataSuccessTimeout: number | undefined;
const loadedBracketDisplay = <HTMLDivElement>document.getElementById('loaded-bracket-display');
let lastImportedData: Bracket | null = null;

function checkLoadedData() {
    copyLoadedDataBtn.style.display = lastImportedData == null ? 'none' : 'initial';
}
checkLoadedData();

copyLoadedDataBtn.addEventListener('click', async () => {
    if (lastImportedData == null) {
        throw new Error('No data has been loaded.');
    }

    try {
        await navigator.clipboard.writeText(JSON.stringify(lastImportedData));
        clearTimeout(copyLoadedDataSuccessTimeout);
        copyLoadedDataBtn.innerText = 'Copied!';
        copyLoadedDataSuccessTimeout = window.setTimeout(() => {
            copyLoadedDataBtn.innerText = 'Copy as JSON';
        }, 2500);
    } catch (e) {
        console.error('Could not write last imported data to clipboard', e);
        copyLoadedDataBtn.innerText = 'Copy as JSON';
    }
});

document.getElementById('match-query-submit')!.addEventListener('click', async () => {
    const query = buildBracketQuery();
    const importer = getImporter();
    const bracket = await importer.getMatches(query);
    loadedBracketDisplay.innerText = `Loaded: ${bracket.name} ${bracket.roundNumber ? `(Round ${bracket.roundNumber})` : ''} (${bracket.eventName})`;
    console.log('Loaded bracket', bracket);
    lastImportedData = bracket;
    checkLoadedData();
    await renderer.setData(bracket);
});

const tournamentDataInput = <HTMLInputElement>document.getElementById('tournament-data-input');

function buildBracketQuery(): Record<string, string | number> {
    const result: Record<string, string | number> = { };

    if (sourceSelect.value === 'input') {
        result.data = tournamentDataInput.value;
    }

    const paramElements = matchQueryContainer.querySelectorAll<HTMLInputElement | HTMLSelectElement>('*:not(.match-query-input-wrapper)[data-key]');
    paramElements.forEach((paramElement) => {
        if (paramElement.tagName === 'SELECT') {
            result[paramElement.dataset.key!] = ((paramElement as HTMLSelectElement).selectedOptions[0]['__TOURNEYVIEW_OPTION_DATA'] as MatchQueryOption).value;
        } else {
            if (paramElement.dataset.tourneyviewType === 'static') {
                result[paramElement.dataset.key!] = paramElement['__TOURNEYVIEW_STATIC_VALUE'];
            } else {
                result[paramElement.dataset.key!] = paramElement.value;
            }

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
         deleteChildParameters((param as HTMLElement).dataset.key!);
         param.parentNode?.removeChild(param);
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

    if (param.type !== 'static') {
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = param.name;
        wrapper.appendChild(label);
    }

    if (param.type === 'numberRange') {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = String(param.min);
        input.max = String(param.max);
        input.value = String(param.min);
        input.id = id;
        input.dataset.key = param.key;
        input.dataset.tourneyviewType = param.type;
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
    } else if (param.type === 'static') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = id;
        input.dataset.key = param.key;
        input.dataset.tourneyviewType = param.type;
        input['__TOURNEYVIEW_STATIC_VALUE'] = param.value;
        wrapper.appendChild(input);
        matchQueryContainer.appendChild(wrapper);
    }
}

renderer.element.style.height = '500px';
renderer.element.style.width = '500px';
renderer.element.style.resize = 'both';
renderer.element.style.border = '1px solid red';
document.body.appendChild(renderer.element);
