import { CounterDto } from '../dto/counters/counter.dto';
import { LogicService } from 'ts-logic-framework';
import { CounterTriggerBuilderService } from './counter-trigger-builder.service';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICounterInstance } from '../interfaces/counter-instance.interface';

export const CounterBuilderService = new (class CounterBuilderService {
  build(
    configuration: CounterDto,
    defaultMethod: CounterMethodEnum,
    defaultAmount: number,
    action: IActionInstance,
  ): ICounterInstance {
    return {
      action,
      counter: LogicService.resolve(configuration.counter, action),
      triggers: configuration.triggers
        ? CounterTriggerBuilderService.buildAll(
            configuration.triggers,
            defaultMethod,
            defaultAmount,
            action,
          )
        : [],
    };
  }
})();
