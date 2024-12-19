import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { EventDto } from './event.dto';
import { ICancelableEvent } from '../../interfaces/cancelable-event.interface';
export type ActionEventDto = {
    type: BuiltinEventTypeEnum.ACTION;
    action: IActionInstance;
} & EventDto & ICancelableEvent;
//# sourceMappingURL=action.event.dto.d.ts.map