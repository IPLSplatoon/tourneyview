import '@tourneyview/renderer/css/base.css';

import { BattlefyImporter } from '@tourneyview/importer';
import { D3BracketAnimator } from '../packages/renderer/lib';
import { BracketRenderer } from '../packages/renderer/lib';

const renderer = new BracketRenderer(700, 500, {
    animator: new D3BracketAnimator(),
    swissOpts: {
        useScrollMask: true
    }
});
const importer = new BattlefyImporter();

const stageIdInput = document.getElementById('stage-input') as HTMLInputElement;
const altStageIdInput = document.getElementById('stage-input-alt') as HTMLInputElement;
document.getElementById('set-stage-button').addEventListener('click', () => importData(stageIdInput.value));
document.getElementById('set-stage-button-alt').addEventListener('click', () => importData(altStageIdInput.value));

const importData = async (data: string) => {
    renderer.setData(await importer.getMatches({ id: data, roundNumber: '1' }));
}

document.body.appendChild(renderer.element);
