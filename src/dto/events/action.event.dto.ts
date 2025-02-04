import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { EventDto } from './event.dto';
import { ICancelableEvent } from '../../interfaces/cancelable-event.interface';
import { IActionInstance } from '../../interfaces/action-instance.interface';

export type ActionEventDto = {
  type: BuiltinEventTypeEnum.ACTION;
  action: IActionInstance;
} & EventDto &
  ICancelableEvent;
