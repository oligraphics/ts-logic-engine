import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { EventDto } from './event.dto';
export type ActionEventDto = {
    type: BuiltinEventTypeEnum.ACTION;
    action: IActionInstance;
} & EventDto;
//# sourceMappingURL=action.event.dto.d.ts.map