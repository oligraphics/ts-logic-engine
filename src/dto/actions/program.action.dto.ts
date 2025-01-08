import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Computable, ComputableValue } from 'ts-logic-framework';
import { ActionDto, ActionStateDto } from './action.dto';

export type ProgramActionStateDto = {
  program: Computable<string>;
  action?: Computable<string>;
  params: { [key: string]: ComputableValue };
} & ActionStateDto;

export type ProgramActionDto = {
  type: BuiltinActionTypeEnum.PROGRAM;
  apply: ProgramActionStateDto;
} & ActionDto;
