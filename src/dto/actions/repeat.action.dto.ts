import { ActionDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Computable } from 'ts-logic-framework';

export type RepeatActionStateDto = {
  repeat: Computable<number>;
  action: Computable<unknown>;
  params?: { [key: string]: Computable<unknown> };
};

export type RepeatActionDto = {
  type: BuiltinActionTypeEnum.REPEAT;
  apply: RepeatActionStateDto;
} & ActionDto;
