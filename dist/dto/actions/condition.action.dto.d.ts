import { ActionDto, ActionStateDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Condition, Computable } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';
export type ConditionActionStateDto = {
    condition: Condition;
    true?: Computable<string>;
    false?: Computable<string>;
    params?: ParamsBlockConfigurationDto;
} & ActionStateDto;
export type ConditionActionDto = {
    type: BuiltinActionTypeEnum.CONDITION;
    apply: ConditionActionStateDto;
} & ActionDto;
//# sourceMappingURL=condition.action.dto.d.ts.map