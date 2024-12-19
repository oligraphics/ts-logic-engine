import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { InterceptActionStateDto } from '../action-states/intercept-action.state.dto';
import { ActionDto } from './action.dto';
export type InterceptActionDto = {
    type: BuiltinActionTypeEnum.INTERCEPT;
    apply: InterceptActionStateDto;
} & ActionDto;
//# sourceMappingURL=intercept.action.dto.d.ts.map