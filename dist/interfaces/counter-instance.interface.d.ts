import { IActionInstance } from './action-instance.interface';
import { ICounterTriggerInstance } from './counter-trigger-instance.interface';
export type ICounterInstance = {
    get action(): IActionInstance;
    get counter(): number;
    get triggers(): ICounterTriggerInstance[];
};
//# sourceMappingURL=counter-instance.interface.d.ts.map