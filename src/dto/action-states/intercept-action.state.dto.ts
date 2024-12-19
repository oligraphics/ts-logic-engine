import { InterceptReactionConfigurationDto } from '../configurations/intercept-reaction.configuration.dto';

export type InterceptActionStateDto = {
  actions: { [id: string]: InterceptReactionConfigurationDto };
};
