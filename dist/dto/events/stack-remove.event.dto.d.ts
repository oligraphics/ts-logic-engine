import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IStackCounterInstance } from '../../interfaces/stack-counter-instance.interface';
import { IActionInstance } from '../../interfaces/action-instance.interface';
export type StackRemoveEventDto = {
    type: BuiltinEventTypeEnum.STACK_REMOVE;
    action: IActionInstance;
    stack: IStackCounterInstance;
} & EventDto;
//# sourceMappingURL=stack-remove.event.dto.d.ts.map