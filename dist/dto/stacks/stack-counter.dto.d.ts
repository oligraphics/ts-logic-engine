import { CounterDto } from '../counters/counter.dto';
import { EventPhaseEnum } from '../../enums/event-phase.enum';
import { Condition } from 'ts-logic-framework';
import { AfterBlockConfigurationDto } from '../configurations/after-block.configuration.dto';
export type StackCounterDto = {
    event?: string;
    phase?: EventPhaseEnum;
    filter?: Condition;
    persistent?: boolean;
    after?: AfterBlockConfigurationDto;
} & CounterDto;
//# sourceMappingURL=stack-counter.dto.d.ts.map