import { IActionContext } from '../interfaces/action-context.interface';

export const ActionContextService = new (class ActionContextService {
  copy(context: IActionContext): IActionContext {
    return {
      actionId: context.actionId,
      action: context.action,
      engine: context.engine,
      program: context.program,
      initiator: context.initiator,
      source: context.source,
      target: context.target,
    };
  }
})();
