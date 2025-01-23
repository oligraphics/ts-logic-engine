import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';
import { Computable } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';

export type CompoundActionStateDto = {
  compound: Computable<string>[];
  params?: ParamsBlockConfigurationDto;
} & ActionStateDto;

export type CompoundActionDto = {
  type: BuiltinActionTypeEnum.COMPOUND;
  apply: CompoundActionStateDto;
} & ActionDto;
