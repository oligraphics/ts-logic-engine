import { CounterDto } from '../dto/counters/counter.dto';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICounterInstance } from '../interfaces/counter-instance.interface';
export declare const CounterBuilderService: {
    build(configuration: CounterDto, triggerType: string, defaultMethod: CounterMethodEnum, defaultAmount: number, action: IActionInstance): ICounterInstance;
};
//# sourceMappingURL=counter-builder.service.d.ts.map