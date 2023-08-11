import { Bracket } from '@tourneyview/common';

export interface BracketRenderer {
    setData(data: Bracket): void | Promise<void>
}
