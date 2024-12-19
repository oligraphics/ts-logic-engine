import { ITriggerInstance } from './trigger-instance.interface';
import { EventDto } from '../dto/events/event.dto';

export interface ITriggerHandler {
  handle(trigger: ITriggerInstance, event: EventDto): void;
}
