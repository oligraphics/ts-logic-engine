import { CounterTriggerDto } from '../dto/triggers/counter.trigger.dto';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICounterTriggerInstance } from '../interfaces/counter-trigger-instance.interface';
export declare const CounterTriggerBuilderService: {
    buildAll(configurations: CounterTriggerDto[], triggerType: string, defaultMethod: CounterMethodEnum, defaultAmount: number, action: IActionInstance): ICounterTriggerInstance[];
    build(configuration: CounterTriggerDto, triggerType: string, defaultMethod: CounterMethodEnum, defaultAmount: number, action: IActionInstance): ICounterTriggerInstance;
};
//# sourceMappingURL=counter-trigger-builder.service.d.ts.map