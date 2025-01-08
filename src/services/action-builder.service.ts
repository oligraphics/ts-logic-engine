import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICreateActionContext } from '../interfaces/create-action-context.interface';
import { ActionTriggerBuilderService } from './action-trigger-builder.service';
import { StackCounterBuilderService } from './stack-counter-builder.service';
import { DynamicContextService, IdService } from 'ts-logic-framework';

export const ActionBuilderService = new (class ActionBuilderService {
  build(
    context: ICreateActionContext,
    properties: { [key: string]: unknown },
    variables: { [key: string]: unknown },
  ): IActionInstance {
    const id = IdService.createRandomId();
    const { action } = context;
    const result: IActionInstance = {
      params: variables,
      state: { ...action.apply },
      ...DynamicContextService.createContext(properties, variables),
      ...DynamicContextService.createContext({
        id,
        engine: context.engine,
        program: context.program,
        initiator: context.initiator,
        source: context.source,
        target: context.target,
        action: context.action,
        actionId: context.actionId,
      }),
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
      Object.assign(
        result,
        DynamicContextService.createContext({
          stacks: StackCounterBuilderService.build(action.stacks, result),
        }),
      );
    }

    return result;
  }
})();
