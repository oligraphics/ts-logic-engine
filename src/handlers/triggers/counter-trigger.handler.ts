import { TriggerHandler } from './trigger.handler';
import { ICounterTriggerInstance } from '../../interfaces/counter-trigger-instance.interface';
import { EventDto } from '../../dto/events/event.dto';

export const CounterTriggerHandler =
  new (class CounterTriggerHandler extends TriggerHandler<ICounterTriggerInstance> {
    handle(trigger: ICounterTriggerInstance, event: EventDto) {
      throw new Error('Not yet implemented');
    }
  })();
