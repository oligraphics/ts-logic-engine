import { CounterDto } from '../dto/counters/counter.dto';
import { LogicService } from 'ts-logic-framework';
import { CounterTriggerBuilderService } from './counter-trigger-builder.service';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICounterInstance } from '../interfaces/counter-instance.interface';

export const CounterBuilderService = new (class CounterBuilderService {
  build(
    configuration: CounterDto,
    triggerType: string,
    defaultMethod: CounterMethodEnum,
    defaultAmount: number,
    action: IActionInstance,
  ): ICounterInstance {
    const value = LogicService.resolve<number>(configuration.value, action);
    if (value === undefined || Number.isNaN(value)) {
      throw new Error(
        'Counter value must be a valid number. ' +
          JSON.stringify(configuration),
      );
    }
    return {
      action,
      triggers: configuration.triggers
        ? CounterTriggerBuilderService.buildAll(
            configuration.triggers,
            triggerType,
            defaultMethod,
            defaultAmount,
            action,
          )
        : [],
      value,
      removed: false,
    };
  }
})();
