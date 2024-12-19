import { ActionDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ConditionActionStateDto } from '../action-states/condition-action.state.dto';

export type ConditionActionDto = {
  type: BuiltinActionTypeEnum.CONDITION;
  apply: ConditionActionStateDto;
} & ActionDto;
