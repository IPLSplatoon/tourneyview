import type { BracketRenderer } from '../renderer/BracketRenderer';

export function revealOnObsSourceVisible(renderer: BracketRenderer, revealDelay: number) {
    window.addEventListener('obsSourceActiveChanged', e => {
        if (e.detail.active) {
            renderer.beforeReveal();
            void renderer.reveal({ delay: revealDelay });
        }
    });
}
