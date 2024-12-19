import { ITriggerContext } from '../interfaces/trigger-context.interface';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IStackCounterInstance } from '../interfaces/stack-counter-instance.interface';
export declare const StackCounterService: {
    tryChange(context: ITriggerContext, method: CounterMethodEnum, amount: number): Promise<boolean>;
    changed(stack: IStackCounterInstance): Promise<void>;
    remove(stack: IStackCounterInstance): Promise<void>;
};
//# sourceMappingURL=stack-counter.service.d.ts.map