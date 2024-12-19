import { IActionInstance } from './action-instance.interface';
import { ICounterTriggerInstance } from './counter-trigger-instance.interface';
export type ICounterInstance = {
    get action(): IActionInstance;
    get triggers(): ICounterTriggerInstance[];
    value: number;
    removed: boolean;
};
//# sourceMappingURL=counter-instance.interface.d.ts.map