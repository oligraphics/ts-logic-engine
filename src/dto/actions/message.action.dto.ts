import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';

export type MessageActionStateDto = {
  message: unknown;
  variables?: ParamsBlockConfigurationDto;
  data?: ParamsBlockConfigurationDto;
} & ActionStateDto;

export type MessageActionDto = {
  type: BuiltinActionTypeEnum.MESSAGE;
  apply: MessageActionStateDto;
} & ActionDto;
