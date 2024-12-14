import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';

export type MessageEventDto = {
  type: BuiltinEventTypeEnum.MESSAGE;
  message: string;
  variables: { [key: string]: string };
} & EventDto;
