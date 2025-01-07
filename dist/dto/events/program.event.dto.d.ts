import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { IProgramContext } from '../../interfaces/program-context.interface';
import { EventDto } from './event.dto';
export type ProgramEventDto = {
    type: BuiltinEventTypeEnum.PROGRAM;
    params?: {
        [key: string]: unknown;
    };
} & IProgramContext & EventDto;
//# sourceMappingURL=program.event.dto.d.ts.map