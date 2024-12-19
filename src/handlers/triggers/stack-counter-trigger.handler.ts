import { TriggerHandler } from './trigger.handler';
import { EventDto } from '../../dto/events/event.dto';
import { ICounterTriggerInstance } from '../../interfaces/counter-trigger-instance.interface';
import { StackCounterService } from '../../services/stack-counter.service';

export const StackCounterTriggerHandler =
  new (class StackCounterTriggerHandler extends TriggerHandler<ICounterTriggerInstance> {
    async handle(trigger: ICounterTriggerInstance, event: EventDto) {
      await StackCounterService.tryChange(
        {
          trigger,
          event,
          action: trigger.action,
        },
        trigger.method,
        trigger.amount,
      );
    }
  })();
