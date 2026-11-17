import type { Bracket } from '@tourneyview/common';
import { DoubleElim } from './DoubleElim.ts';
import { DoubleElim32Team } from './DoubleElim32Team.ts';
import { DoubleElimLargeGroupStage } from './DoubleElimLargeGroupStage.ts';
import { DoubleElimSmall } from './DoubleElimSmall.ts';
import { RoundRobin } from './RoundRobin.ts';
import { RoundRobinSmall } from './RoundRobinSmall.ts';
import { SingleElim } from './SingleElim.ts';
import { SingleElim1Round } from './SingleElim1Round.ts';
import { Swiss } from './Swiss.ts';
import { SwissSmall } from './SwissSmall.ts';

export const testCases: Record<string, Bracket> = {
    DoubleElim: DoubleElim,
    DoubleElim32Team: DoubleElim32Team,
    DoubleElimLargeGroupStage: DoubleElimLargeGroupStage,
    DoubleElimSmall: DoubleElimSmall,
    RoundRobin: RoundRobin,
    RoundRobinSmall: RoundRobinSmall,
    SingleElim: SingleElim,
    SingleElim1Round: SingleElim1Round,
    Swiss: Swiss,
    SwissSmall: SwissSmall
};