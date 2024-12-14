import { EventDto } from '../dto/events/event.dto';
import { IActionInstance } from './action-instance.interface';
import { ITriggerInstance } from './trigger-instance.interface';

export type ITriggerContext = {
  event?: EventDto;
  trigger?: ITriggerInstance;
  get action(): IActionInstance;
};
