import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IStackCounterInstance } from '../../interfaces/stack-counter-instance.interface';
import { CounterMethodEnum } from '../../enums/counter-method.enum';
import { ICancelableEvent } from '../../interfaces/cancelable-event.interface';

export type StackChangeEventDto = {
  type: BuiltinEventTypeEnum.STACK_CHANGE;
  stack: IStackCounterInstance;
  method: CounterMethodEnum;
  amount: number;
  oldValue: number;
  newValue: number;
  change: number;
} & EventDto &
  ICancelableEvent;
