import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';
import { Computable } from 'ts-logic-framework';

export type MessageActionStateDto = {
  message: unknown;
  variables?: { [key: string]: Computable<unknown> };
  data?: { [key: string]: Computable<unknown> };
} & ActionStateDto;

export type MessageActionDto = {
  type: BuiltinActionTypeEnum.MESSAGE;
  apply: MessageActionStateDto;
} & ActionDto;
