import { ActionDto, ActionStateDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Condition, Computable } from 'ts-logic-framework';
export type ConditionActionStateDto = {
    condition: Condition;
    true?: Computable<string>;
    false?: Computable<string>;
    params?: {
        [key: string]: Computable<unknown>;
    };
} & ActionStateDto;
export type ConditionActionDto = {
    type: BuiltinActionTypeEnum.CONDITION;
    apply: ConditionActionStateDto;
} & ActionDto;
//# sourceMappingURL=condition.action.dto.d.ts.map