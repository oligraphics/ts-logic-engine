import { CounterTriggerDto } from '../triggers/counter.trigger.dto';
import { Computable } from 'ts-logic-framework';
export type CounterDto = {
    value: Computable<number>;
    triggers?: CounterTriggerDto[];
};
//# sourceMappingURL=counter.dto.d.ts.map