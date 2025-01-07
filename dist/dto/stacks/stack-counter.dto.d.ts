import { CounterDto } from '../counters/counter.dto';
import { EventPhaseEnum } from '../../enums/event-phase.enum';
import { Computable, Condition } from 'ts-logic-framework';
export type StackCounterDto = {
    event?: string;
    phase?: EventPhaseEnum;
    filter?: Condition;
    persistent?: boolean;
    after?: {
        params?: {
            [key: string]: unknown;
        };
        next: Computable<string>;
    };
} & CounterDto;
//# sourceMappingURL=stack-counter.dto.d.ts.map