import { ActionDto } from './action.dto';
import { GlobalActionTypeEnum } from '../../enums/global-action-type.enum';
import { ConditionActionStateDto } from '../states/condition-action.state.dto';
export type ConditionActionDto = {
    type: GlobalActionTypeEnum.CONDITION;
    apply: ConditionActionStateDto;
} & ActionDto;
//# sourceMappingURL=condition.action.dto.d.ts.map