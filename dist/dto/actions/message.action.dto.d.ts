import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto } from './action.dto';
import { MessageActionStateDto } from '../action-states/message-action.state.dto';
export type MessageActionDto = {
    type: BuiltinActionTypeEnum.MESSAGE;
    apply: MessageActionStateDto;
} & ActionDto;
//# sourceMappingURL=message.action.dto.d.ts.map