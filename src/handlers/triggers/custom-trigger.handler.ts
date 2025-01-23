import { TriggerHandler } from './trigger.handler';
import { EventDto } from '../../dto/events/event.dto';
import { ICustomTriggerInstance } from '../../interfaces/custom-trigger-instance.interface';

export const CustomTriggerHandler =
  new (class CustomTriggerHandler extends TriggerHandler<ICustomTriggerInstance> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(trigger: ICustomTriggerInstance, event: EventDto) {
      throw new Error('Not yet implemented');
    }
  })();
