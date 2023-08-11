import '@tourneyview/renderer/css/base.css';
import { BattlefyImporter } from '@tourneyview/importer';
import { BaseTextFormatter, D3BracketAnimator } from '../packages/renderer/lib';
import { SwissRenderer } from '../packages/renderer/lib/renderer/SwissRenderer';

// const renderer = new EliminationRenderer(1000, 1000, {
//     animator: new D3BracketAnimator()
// });
const renderer = new SwissRenderer(700, 500, {
    formatter: new BaseTextFormatter(),
    useScrollMask: true,
    animator: new D3BracketAnimator()
});
const importer = new BattlefyImporter();

const stageIdInput = document.getElementById('stage-input') as HTMLInputElement;
const altStageIdInput = document.getElementById('stage-input-alt') as HTMLInputElement;
document.getElementById('set-stage-button').addEventListener('click', () => importData(stageIdInput.value));
document.getElementById('set-stage-button-alt').addEventListener('click', () => importData(altStageIdInput.value));

const importData = async (data: string) => {
    // se 16 teams: 5ea9d5c373e90d3dd448288c
    // se 32 teams: 62f6af9571f65222a4282bc5
    // se 64 teams: 6488d4bc7d17c034296485aa
    // de 8 teams: 633ec84d04022f28a84f6809
    // de 12 teams: 62fe9a5bc19ee145a2efa31a
    // low ink de: 643ad67d227ec44112fbaeb6
    // sos rr: 64af308261c247675b6dbffb
    // li swiss: 648dc6d95fbfa53423cdca58
    // li swiss(2): 648dc6f3ad149d17b8f84117
    // console.log(await importer.getMatches({ id: data }));
    renderer.setData(await importer.getMatches({ id: data, roundNumber: '1' }));
}

document.body.appendChild(renderer.getElement());
