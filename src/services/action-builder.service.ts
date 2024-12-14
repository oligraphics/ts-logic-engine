import { IActionInstance } from '../interfaces/action-instance.interface';
import { IdService } from './id.service';
import { ICreateActionContext } from '../interfaces/create-action-context.interface';
import { ActionTriggerBuilderService } from './action-trigger-builder.service';
import { StackCounterBuilderService } from './stack-counter-builder.service';

export const ActionBuilderService = new (class ActionBuilderService {
  build(context: ICreateActionContext): IActionInstance {
    const id = IdService.createRandomId();
    const { action } = context;
    const result: IActionInstance = {
      id,
      engine: context.engine,
      program: context.program,
      initiator: context.initiator,
      source: context.source,
      target: context.target,
      action: context.action,
      actionId: context.actionId,
      state: { ...action.apply },
      triggers: undefined,
      stacks: undefined,
      statusEffect: undefined,
      debug: action.debug || context.program.debug,
    };

    if (action.triggers) {
      result.triggers = ActionTriggerBuilderService.buildAll(
        action.triggers,
        result,
      );
    }

    if (action.stacks) {
      result.stacks = StackCounterBuilderService.build(action.stacks, result);
    }

    return result;
  }
})();
