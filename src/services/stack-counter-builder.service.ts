import { CounterBuilderService } from './counter-builder.service';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { IStackCounterInstance } from '../interfaces/stack-counter-instance.interface';
import { BuiltinTriggerTypeEnum } from '../enums/builtin-trigger-type.enum';
import { StackCounterDto } from '../dto/stacks/stack-counter.dto';
import { CounterTriggerBuilderService } from './counter-trigger-builder.service';
import { TriggerDto } from '../dto/triggers/trigger.dto';
import { BuiltinEventTypeEnum } from '../enums/builtin-event-type.enum';
import { EventPhaseEnum } from '../enums/event-phase.enum';

export const StackCounterBuilderService =
  new (class StackCounterBuilderService {
    build(
      configuration: StackCounterDto,
      action: IActionInstance,
    ): IStackCounterInstance {
      const counter = CounterBuilderService.build(
        configuration,
        BuiltinTriggerTypeEnum.STACK,
        CounterMethodEnum.REDUCE,
        1,
        action,
      );
      if (configuration.event) {
        counter.triggers.push(
          CounterTriggerBuilderService.build(
            configuration as TriggerDto,
            BuiltinTriggerTypeEnum.STACK,
            CounterMethodEnum.REDUCE,
            1,
            action,
          ),
        );
      } else if (counter.triggers.length === 0) {
        counter.triggers.push(
          CounterTriggerBuilderService.build(
            {
              event: BuiltinEventTypeEnum.TRIGGER,
              phase: EventPhaseEnum.PERFORMED,
            },
            BuiltinTriggerTypeEnum.STACK,
            CounterMethodEnum.REDUCE,
            1,
            action,
          ),
        );
      }
      return {
        ...counter,
        persistent: !!configuration.persistent,
      };
    }
  })();
