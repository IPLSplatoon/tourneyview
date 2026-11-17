import type { Bracket } from '@tourneyview/common';
import { BracketType } from '@tourneyview/common';
import type { BracketRenderer } from '@tourneyview/renderer';
import { testCases } from './cases';
import { applyProgressRemovalStep, progressRemovalSteps } from './progressRemovalSteps.ts';

function getPrettyBracketType(bracketType: BracketType): string {
    switch (bracketType) {
        case BracketType.DOUBLE_ELIMINATION:
            return 'Double Elimination';
        case BracketType.SINGLE_ELIMINATION:
            return 'Single Elimination';
        case BracketType.LADDER:
            return 'Ladder';
        case BracketType.ROUND_ROBIN:
            return 'Round Robin';
        case BracketType.SWISS:
            return 'Swiss';
        default:
            return bracketType;
    }
}

function formatBracketName(bracket: Bracket): string {
    return bracket.matchGroups.length === 1 && bracket.matchGroups[0].name !== bracket.name
        ? `${bracket.matchGroups[0].name} of ${bracket.name}`
        : bracket.name;
}

function formatBracketEventName(bracket: Bracket): string {
    return bracket.tournamentName == null
        ? bracket.eventName
        : `${bracket.tournamentName} (${bracket.eventName})`;
}

function getKeyValueDisplay(label: string): { wrapper: HTMLElement, setValue: (newValue: string) => void } {
    const labelElem = document.createElement('b');
    labelElem.innerText = label + ': ';
    const valueElem = document.createElement('span');
    valueElem.innerText = '---';

    const wrapper = document.createElement('div');
    wrapper.append(labelElem, valueElem);

    return {
        wrapper,
        setValue(newValue: string) {
            valueElem.innerText = newValue;
        }
    };
}

export function installTestHarness(renderer: BracketRenderer): void {
    if (renderer.element.parentElement == null) {
        throw new Error('Renderer\'s element must be added to document before running installTestHarness');
    }

    const testHarnessWrapper = document.createElement('div');
    testHarnessWrapper.classList.add('tourneyview-renderer-test-harness');
    testHarnessWrapper.style.left = `${renderer.element.offsetLeft + 8}px`;
    testHarnessWrapper.style.top = `${renderer.element.offsetTop + 8}px`;

    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = 'Tourneyview Tests';
    makeDraggable(testHarnessWrapper, title);

    const caseSelect = document.createElement('select');
    for (const caseKey of Object.keys(testCases)) {
        const testCase = testCases[caseKey];
        const caseProgressRemovalSteps = progressRemovalSteps[caseKey];

        if (caseProgressRemovalSteps == null) {
            caseSelect.appendChild(createOption(testCase.name, caseKey));
        } else {
            const caseGroup = document.createElement('optgroup');
            caseGroup.label = testCase.name;

            caseProgressRemovalSteps.forEach((_, i) => {
                const option = createOption(`${testCase.name} - Step ${i + 1}`, caseKey, i);
                option.dataset.caseKey = caseKey;
                option.dataset.progressRemovalStepIndex = String(i);

                caseGroup.appendChild(option);
            });

            caseGroup.appendChild(createOption(`${testCase.name} - Step ${caseProgressRemovalSteps.length + 1}`, caseKey));
            caseSelect.appendChild(caseGroup);
        }
    }

    const caseSelectLabel = document.createElement('label');
    caseSelectLabel.innerText = 'Test Case ';
    caseSelectLabel.appendChild(caseSelect);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Apply';
    submitButton.type = 'submit';

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedOption = caseSelect.selectedOptions[0];
        const caseKey = String(selectedOption.dataset.caseKey);

        let selectedCase = testCases[caseKey];
        if (selectedCase == null) return;

        const progressRemovalStepIndex = selectedOption.dataset.progressRemovalStepIndex;
        if (progressRemovalStepIndex != null) {
            const progressRemovalStep = progressRemovalSteps[caseKey][Number(progressRemovalStepIndex)];
            selectedCase = applyProgressRemovalStep(selectedCase, progressRemovalStep);
        }

        submitButton.disabled = true;
        submitButton.innerText = 'Working...';
        renderer.setData(selectedCase)
            .then(() => {
                submitButton.innerText = 'OK!';
                setTimeout(() => {
                    submitButton.innerText = 'Apply';
                }, 5000);
            })
            .catch((e) => {
                console.error('Failed to update renderer', e);
                submitButton.innerText = 'Error!';
                setTimeout(() => {
                    submitButton.innerText = 'Apply';
                }, 5000);
            })
            .finally(() => {
                submitButton.disabled = false;
            });
    });
    form.append(caseSelectLabel, submitButton);

    const bracketNameDisplay = getKeyValueDisplay('Bracket');
    const bracketTypeDisplay = getKeyValueDisplay('Type');
    const eventNameDisplay = getKeyValueDisplay('Event');
    const bracketDetailsWrapper = createDetails('Bracket Info', bracketNameDisplay.wrapper, bracketTypeDisplay.wrapper, eventNameDisplay.wrapper);

    testHarnessWrapper.append(
        title,
        form,
        bracketDetailsWrapper);
    renderer.element.parentElement.appendChild(testHarnessWrapper);

    const realSetData = renderer.setData.bind(renderer);
    renderer.setData = async function(data: Bracket) {
        bracketNameDisplay.setValue(formatBracketName(data));
        bracketTypeDisplay.setValue(getPrettyBracketType(data.type));
        eventNameDisplay.setValue(formatBracketEventName(data));

        console.time('setData returned in');
        console.time('setData resolved in');
        const promise = realSetData(data);
        console.timeEnd('setData returned in');
        return promise.then((result) => {
            console.timeEnd('setData resolved in');
            return result;
        });
    };
}

function createOption(name: string, caseKey: string, progressRemovalStepIndex: number | undefined = undefined): HTMLOptionElement {
    const result = document.createElement('option');
    result.value = `${caseKey}${progressRemovalStepIndex == null ? '' : ('__' + progressRemovalStepIndex)}`;
    result.innerText = name;
    result.dataset.caseKey = caseKey;
    if (progressRemovalStepIndex != null) {
        result.dataset.progressRemovalStepIndex = String(progressRemovalStepIndex);
    }
    return result;
}

function createDetails(title: string, ...content: (string | Node)[]): HTMLDetailsElement {
    const result = document.createElement('details');
    const titleElem = document.createElement('summary');
    titleElem.innerText = title;
    result.append(titleElem, ...content);
    return result;
}

function makeDraggable(element: HTMLElement, draggableArea: HTMLElement): void {
    let lastX = 0;
    let lastY = 0;

    const mouseMovementListener = (e: MouseEvent) => {
        const deltaX = lastX - e.clientX;
        const deltaY = lastY - e.clientY;

        element.style.left = (element.offsetLeft - deltaX) + 'px';
        element.style.top = (element.offsetTop - deltaY) + 'px';

        lastX = e.clientX;
        lastY = e.clientY;
    };

    const touchMovementListener = (e: TouchEvent) => {
        const deltaX = lastX - e.targetTouches[0].clientX;
        const deltaY = lastY - e.targetTouches[0].clientY;

        element.style.left = (element.offsetLeft - deltaX) + 'px';
        element.style.top = (element.offsetTop - deltaY) + 'px';

        lastX = e.targetTouches[0].clientX;
        lastY = e.targetTouches[0].clientY;
    };

    draggableArea.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', mouseMovementListener);
        lastX = e.clientX;
        lastY = e.clientY;
    });
    draggableArea.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', mouseMovementListener);
    });
    draggableArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.addEventListener('touchmove', touchMovementListener);
        lastX = e.targetTouches[0].clientX;
        lastY = e.targetTouches[0].clientY;
    });
    draggableArea.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', touchMovementListener);
    });
}
