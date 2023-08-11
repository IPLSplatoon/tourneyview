const SCROLL_MASK_VISIBILITY_OFFSET = 35;
type ScrollMaskSide = 'top' | 'bottom';

const SCROLL_MASKED_CLASS_NAME = 'scroll-masked';

export class ScrollMask {
    private readonly target: HTMLElement;

    private readonly listenerFunction: () => void;

    constructor(target: HTMLElement) {
        this.target = target;

        this.listenerFunction = () => this.refreshMask();
    }

    start() {
        this.refreshMask();
        if (!this.target.classList.contains(SCROLL_MASKED_CLASS_NAME)) {
            this.target.classList.add(SCROLL_MASKED_CLASS_NAME);
            this.target.addEventListener('scroll', this.listenerFunction);
        }
    }

    stop() {
        this.target.removeEventListener('scroll', this.listenerFunction);
        this.target.classList.remove(SCROLL_MASKED_CLASS_NAME, 'scroll-mask-top', 'scroll-mask-bottom');
    }

    refreshMask() {
        this.toggleMask('top', this.target.scrollTop > SCROLL_MASK_VISIBILITY_OFFSET);
        this.toggleMask('bottom', Math.abs(this.target.scrollHeight - this.target.clientHeight - this.target.scrollTop) >= SCROLL_MASK_VISIBILITY_OFFSET);
    }

    private toggleMask(side: ScrollMaskSide, visible: boolean) {
        if (visible) {
            this.target.classList.add(`scroll-mask-${side}`);
        } else {
            this.target.classList.remove(`scroll-mask-${side}`);
        }
    }
}