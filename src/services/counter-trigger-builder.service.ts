import { CounterTriggerDto } from '../dto/triggers/counter.trigger.dto';
import { IdService } from './id.service';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { LogicService } from 'ts-logic-framework';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICounterTriggerInstance } from '../interfaces/counter-trigger-instance.interface';

export const CounterTriggerBuilderService =
  new (class CounterTriggerBuilderService {
    buildAll(
      configurations: CounterTriggerDto[],
      triggerType: string,
      defaultMethod: CounterMethodEnum,
      defaultAmount: number,
      action: IActionInstance,
    ): ICounterTriggerInstance[] {
      return configurations.map((c) =>
        this.build(c, triggerType, defaultMethod, defaultAmount, action),
      );
    }
    build(
      configuration: CounterTriggerDto,
      triggerType: string,
      defaultMethod: CounterMethodEnum,
      defaultAmount: number,
      action: IActionInstance,
    ): ICounterTriggerInstance {
      const method =
        (configuration.method
          ? LogicService.resolve<CounterMethodEnum>(
              configuration.method,
              action,
              configuration.debug,
            )
          : undefined) ?? defaultMethod;
      const amount =
        (configuration.amount
          ? LogicService.resolve<number>(
              configuration.amount,
              action,
              configuration.debug,
            )
          : undefined) ?? defaultAmount;
      return {
        id: IdService.createRandomId(),
        type: triggerType,
        action,
        ...configuration,
        method,
        amount,
      };
    }
  })();
