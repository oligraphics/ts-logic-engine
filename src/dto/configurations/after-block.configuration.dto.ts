import { Computable } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from './params-block.configuration.dto';

export type AfterBlockConfigurationDto = {
  params: ParamsBlockConfigurationDto;
  next: Computable<string>;
};
