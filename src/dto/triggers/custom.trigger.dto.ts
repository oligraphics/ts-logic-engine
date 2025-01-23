import { TriggerDto } from './trigger.dto';
import { EventDto } from '../events/event.dto';

export type CustomTriggerDto = {
  trigger: (event: EventDto) => Promise<void> | void;
} & TriggerDto;
