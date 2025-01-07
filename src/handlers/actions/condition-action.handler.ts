import {
  ConditionActionDto,
  ConditionActionStateDto,
} from '../../dto/actions/condition.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { ConditionService, Computable, LogicService } from 'ts-logic-framework';
import { ActionHandler } from './action.handler';

export const ConditionActionHandler =
  new (class ConditionActionHandler extends ActionHandler<
    ConditionActionDto,
    ConditionActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>,
    ): Promise<boolean> {
      const { action } = context;
      const { state, actionId, debug } = action;
      const checkResult = ConditionService.testCondition(
        state.condition,
        context,
      );
      if (debug) {
        console.debug(
          'Condition check result',
          action.program.id,
          '>',
          actionId,
          checkResult,
        );
      }
      if (checkResult === true) {
        if (state.true) {
          return await this.handleCase(context, state.true);
        }
      } else {
        if (state.false) {
          return await this.handleCase(context, state.false);
        }
      }
      return true;
    }
    async handleCase(
      context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>,
      subActionReference: Computable<string>,
    ): Promise<boolean> {
      const { action } = context;
      const { engine, program, debug } = action;
      const subActionId = LogicService.resolve<string>(
        subActionReference,
        context,
      );
      if (!program) {
        console.error('Program missing in action', action);
        return false;
      }
      if (!subActionId) {
        if (debug) {
          console.error('Condition case invalid:', subActionReference);
        }
        return false;
      }
      const subAction = program.actions[subActionId];
      if (!subAction) {
        if (debug) {
          console.error('Condition case not found:', subActionId);
        }
        return false;
      }
      return await engine.tryRun({
        ...context.action,
        actionId: subActionId,
        debug: debug || subAction.debug,
      });
    }
  })();
