import { ITriggerInstance } from './trigger-instance.interface';
import { CounterMethodEnum } from '../enums/counter-method.enum';
export type ICounterTriggerInstance = {
    method: CounterMethodEnum;
    amount: number;
} & ITriggerInstance;
//# sourceMappingURL=counter-trigger-instance.interface.d.ts.map