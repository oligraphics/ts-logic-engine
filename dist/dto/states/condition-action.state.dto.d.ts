import { ActionStateDto } from './action.state.dto';
import { ActionDto } from '../actions/action.dto';
import { Condition } from 'ts-logic-framework';
export type ConditionActionStateDto = {
    condition: Condition;
    true?: ActionDto;
    false?: ActionDto;
} & ActionStateDto;
//# sourceMappingURL=condition-action.state.dto.d.ts.map