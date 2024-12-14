import { ITargetable } from '../interfaces/target.interface';
import { DynamicContext, DynamicValue, LogicService } from 'ts-logic-framework';

export const TargetService = new (class TargetService {
  resolveTargets(
    value: DynamicValue,
    context: DynamicContext,
    debug?: boolean,
  ): ITargetable[] {
    const result = LogicService.resolve(value, context, debug);
    if (Array.isArray(result)) {
      return result
        .filter((t) => (t as ITargetable)?.allowTargeting)
        .map((t) => t as ITargetable);
    }
    return (result as ITargetable)?.allowTargeting ? [<ITargetable>result] : [];
  }
})();
