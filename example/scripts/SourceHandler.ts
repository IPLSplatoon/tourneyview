const sourceSelect = <HTMLSelectElement>document.getElementById('tournament-source-input');
const apiKeyInputWrapper = <HTMLDivElement>document.getElementById('api-key-input-wrapper');
const tournamentDataInputWrapper = <HTMLDivElement>document.getElementById('tournament-data-input-wrapper');
const matchQueryContainer = document.getElementById('match-query-container')!;

function checkSource() {
    apiKeyInputWrapper.style.display = (sourceSelect.value === 'startgg' || sourceSelect.value === 'sendouink') ? 'block' : 'none';
    matchQueryContainer.style.display = sourceSelect.value === 'clipboard' || sourceSelect.value === 'input' ? 'none' : 'block';
    tournamentDataInputWrapper.style.display = sourceSelect.value === 'input' ? 'block' : 'none';
}

function setSourceOptions() {
    // Firefox :(
    if (!navigator.clipboard.readText) {
        sourceSelect.options.add(createOption('input', 'Read from text input'));
    } else {
        sourceSelect.options.add(createOption('clipboard', 'Read from clipboard'));
    }

    checkSource();
}

function createOption(value: string, text: string): HTMLOptionElement {
    const result = document.createElement('option');
    result.innerText = text;
    result.value = value;
    return result;
}

sourceSelect.addEventListener('change', checkSource);
document.addEventListener('DOMContentLoaded', setSourceOptions);
