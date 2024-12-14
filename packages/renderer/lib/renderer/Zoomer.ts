import * as d3 from 'd3';

export class Zoomer {

    private readonly zoomBehavior: d3.ZoomBehavior<Element, unknown>;
    private resizeObserver: ResizeObserver;

    private readonly container: d3.Selection<Element, undefined, null, undefined>;
    private containerWidth?: number;
    private containerHeight?: number;

    private contentWidth?: number;
    private contentHeight?: number;

    private readonly maxScale: number;

    constructor(
        container: d3.Selection<Element, undefined, null, undefined>,
        onZoom: (event: d3.D3ZoomEvent<HTMLElement, never>) => void,
        maxScale = 2
    ) {
        this.zoomBehavior = d3.zoom()
            .extent([[0, 0], [2048, 2048]])
            .on('zoom', e => onZoom(e));

        this.maxScale = maxScale;

        this.container = container;
        this.resizeObserver = new ResizeObserver(entries => {
            if (entries.length < 1) {
                console.error(`Received resize event with ${entries.length} entries; cannot continue`);
                return;
            } else if (entries.length > 1) {
                console.warn(`Received resize event with ${entries.length} entries; expected 1`);
            }

            const entry = entries[0];
            this.containerHeight = entry.contentBoxSize[0].blockSize;
            this.containerWidth = entry.contentBoxSize[0].inlineSize;
            this.calculateZoom();
        });

        this.resizeObserver.observe(container.node()!);
    }

    public recalculateContainerSize(): void {
        const boundingRect = this.container.node()!.getBoundingClientRect();
        this.containerWidth = boundingRect.width;
        this.containerHeight = boundingRect.height;
        this.calculateZoom();
    }

    public setContentSize(width: number, height: number): void {
        this.contentWidth = width;
        this.contentHeight = height;
        this.calculateZoom();
    }

    private calculateZoom(): void {
        if (this.containerHeight == null || this.containerWidth == null
            || this.contentHeight == null || this.contentWidth == null) {
            return;
        }

        this.zoomBehavior.extent([[0, 0], [this.containerWidth, this.containerHeight]]);
        this.zoomBehavior.translateTo(
            this.container as d3.Selection<Element, unknown, null, undefined>,
            this.contentWidth / 2,
            this.contentHeight / 2
        );
        this.zoomBehavior.scaleTo(
            this.container as d3.Selection<Element, unknown, null, undefined>,
            Math.min(this.containerHeight / this.contentHeight, this.containerWidth / this.contentWidth, this.maxScale)
        );
    }

    public disconnect(): void {
        this.resizeObserver.disconnect();
    }

    public static toCSSTransform(event: d3.D3ZoomEvent<HTMLElement, never>): string {
        return `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`;
    }
}
