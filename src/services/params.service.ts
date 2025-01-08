import { Computable, DynamicContext, LogicService } from 'ts-logic-framework';

export const ParamsService = new (class ParamsService {
  resolve(
    params: { [key: string]: Computable<unknown> },
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
