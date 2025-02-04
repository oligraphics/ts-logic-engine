import { TriggerHandler } from './trigger.handler';
import { EventDto } from '../../dto/events/event.dto';
import { ICustomTriggerInstance } from '../../interfaces/custom-trigger-instance.interface';

export const CustomTriggerHandler =
  new (class CustomTriggerHandler extends TriggerHandler<ICustomTriggerInstance> {
    async handle(trigger: ICustomTriggerInstance, event: EventDto) {
      const callback = trigger.trigger;
      if (callback) {
        await callback(event);
      }
    }
  })();
