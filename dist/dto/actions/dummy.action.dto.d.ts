import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto } from './action.dto';
export type DummyActionDto = {
    type: BuiltinActionTypeEnum.DUMMY;
    apply: object;
} & ActionDto;
//# sourceMappingURL=dummy.action.dto.d.ts.map