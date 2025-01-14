import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { EventDto } from './event.dto';
import { ICancelableEvent } from '../../interfaces/cancelable-event.interface';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { Computable } from 'ts-logic-framework';

export type RepeatActionEventDto = {
  type: BuiltinEventTypeEnum.REPEAT_ACTION;
  action: IActionInstance;
  repeat: number;
  repeatAction: string;
  params: { [key: string]: Computable<unknown> };
} & EventDto &
  ICancelableEvent;
