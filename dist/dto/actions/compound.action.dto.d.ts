import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto } from './action.dto';
import { CompoundActionStateDto } from '../action-states/compound-action.state.dto';
export type CompoundActionDto = {
    type: BuiltinActionTypeEnum.COMPOUND;
    apply: CompoundActionStateDto;
} & ActionDto;
//# sourceMappingURL=compound.action.dto.d.ts.map