import { EventDto } from './event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IActionInstance } from '../../interfaces/action-instance.interface';
export type MessageEventDto = {
    type: BuiltinEventTypeEnum.MESSAGE;
    action: IActionInstance;
    message: string;
    variables: {
        [key: string]: string;
    };
    data: {
        [key: string]: unknown;
    };
} & EventDto;
//# sourceMappingURL=message.event.dto.d.ts.map