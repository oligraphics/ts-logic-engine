import { CounterDto } from '../dto/counters/counter.dto';
import { CounterBuilderService } from './counter-builder.service';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { IStackCounterInstance } from '../interfaces/stack-counter-instance.interface';

export const StackCounterBuilderService =
  new (class StackCounterBuilderService {
    build(
      configuration: CounterDto,
      action: IActionInstance,
    ): IStackCounterInstance {
      const counter = CounterBuilderService.build(
        configuration,
        CounterMethodEnum.REDUCE,
        1,
        action,
      );
      return {
        ...counter,
      };
    }
  })();
