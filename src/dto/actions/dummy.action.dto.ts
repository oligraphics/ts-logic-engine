import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';

export type DummyActionStateDto = ActionStateDto;

export type DummyActionDto = {
  type: BuiltinActionTypeEnum.DUMMY;
  apply: DummyActionStateDto;
} & ActionDto;
