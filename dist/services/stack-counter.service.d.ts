import { ITriggerContext } from '../interfaces/trigger-context.interface';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IStackCounterInstance } from '../interfaces/stack-counter-instance.interface';
export declare const StackCounterService: {
    tryChange(context: ITriggerContext, method: CounterMethodEnum, amount: number): boolean;
    changed(stack: IStackCounterInstance): void;
    remove(stack: IStackCounterInstance): void;
};
//# sourceMappingURL=stack-counter.service.d.ts.map