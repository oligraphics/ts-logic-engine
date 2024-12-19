import { ActionDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { RepeatActionStateDto } from '../action-states/repeat-action.state.dto';

export type RepeatActionDto = {
  type: BuiltinActionTypeEnum.REPEAT;
  apply: RepeatActionStateDto;
} & ActionDto;
