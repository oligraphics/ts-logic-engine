import { CounterDto } from '../counters/counter.dto';
import { EventPhaseEnum } from '../../enums/event-phase.enum';
import { Condition } from 'ts-logic-framework';
export type StackCounterDto = {
    event?: string;
    phase?: EventPhaseEnum;
    filter?: Condition;
    persistent?: boolean;
} & CounterDto;
//# sourceMappingURL=stack-counter.dto.d.ts.map