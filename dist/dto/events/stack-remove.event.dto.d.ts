import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IStackCounterInstance } from '../../interfaces/stack-counter-instance.interface';
export type StackRemoveEventDto = {
    type: BuiltinEventTypeEnum.STACK_REMOVE;
    stack: IStackCounterInstance;
} & EventDto;
//# sourceMappingURL=stack-remove.event.dto.d.ts.map