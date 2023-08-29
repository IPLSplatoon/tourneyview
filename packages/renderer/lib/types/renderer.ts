import { Bracket, BracketType } from '@tourneyview/common';

export abstract class BracketTypeRenderer {
    public static readonly compatibleBracketTypes: BracketType[]

    abstract setData(data: Bracket): void | Promise<void>

    abstract hide(): void | Promise<void>

    abstract install(target: HTMLElement): void

    abstract destroy(): void

    abstract getElement(): HTMLElement
}
