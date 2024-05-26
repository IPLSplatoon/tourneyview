import { Bracket, BracketType } from '@tourneyview/common';
import { PublicBracketAnimationOpts } from './animator';

export abstract class BracketTypeRenderer {
    public static readonly compatibleBracketTypes: BracketType[]

    abstract setData(data: Bracket): void | Promise<void>

    abstract hide(opts?: PublicBracketAnimationOpts): void | Promise<void>

    abstract beforeReveal(): void

    abstract reveal(opts?: PublicBracketAnimationOpts): void | Promise<void>

    abstract install(target: HTMLElement): void

    abstract destroy(): void

    abstract getElement(): HTMLElement
}
