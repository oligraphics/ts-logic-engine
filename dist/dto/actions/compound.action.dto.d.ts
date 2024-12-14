import { GlobalActionTypeEnum } from '../../enums/global-action-type.enum';
import { ActionDto } from './action.dto';
import { CompoundActionStateDto } from '../states/compound-action.state.dto';
export type CompoundActionDto = {
    type: GlobalActionTypeEnum.COMPOUND;
    apply: CompoundActionStateDto;
} & ActionDto;
//# sourceMappingURL=compound.action.dto.d.ts.map