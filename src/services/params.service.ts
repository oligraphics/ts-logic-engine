import { DynamicContext, LogicService } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from '../dto/configurations/params-block.configuration.dto';

export const ParamsService = new (class ParamsService {
  resolve(
    params: ParamsBlockConfigurationDto,
    context: DynamicContext,
    debug?: boolean,
  ): { [key: string]: unknown } {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => [
        key,
        LogicService.resolve(value, context, debug),
      ]),
    );
  }
})();
