import { ITargetable } from '../interfaces/target.interface';
import { DynamicContext, LogicService } from 'ts-logic-framework';
import { ActionDto } from '../dto/actions/action.dto';
import { GroupTarget } from '../models/group-target.model';

export const TargetService = new (class TargetService {
  resolveTargets(
    action: ActionDto,
    context: DynamicContext,
    debug?: boolean,
  ): ITargetable[] | undefined {
    const value = action.targets ?? action.target;
    if (value === undefined) {
      return undefined;
    }
    const result = LogicService.resolve(value, context, debug);
    let validTargets: ITargetable[];
    if (Array.isArray(result)) {
      validTargets = result
        .filter((t) => (t as ITargetable)?.allowTargeting !== false)
        .map((t) => t as ITargetable);
    } else {
      validTargets =
        (result as ITargetable)?.allowTargeting !== false
          ? [<ITargetable>result]
          : [];
    }
    return action.targets ? validTargets : [new GroupTarget(validTargets)];
  }
})();
