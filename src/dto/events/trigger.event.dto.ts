import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';

export type TriggerEventDto = {
  type: BuiltinEventTypeEnum.TRIGGER;
} & EventDto;
