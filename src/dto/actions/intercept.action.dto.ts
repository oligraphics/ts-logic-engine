import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto } from './action.dto';
import { InterceptReactionConfigurationDto } from '../configurations/intercept-reaction.configuration.dto';

export type InterceptActionStateDto = {
  actions: { [id: string]: InterceptReactionConfigurationDto };
};

export type InterceptActionDto = {
  type: BuiltinActionTypeEnum.INTERCEPT;
  apply: InterceptActionStateDto;
} & ActionDto;
