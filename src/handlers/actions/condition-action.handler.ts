import { ConditionActionDto } from '../../dto/actions/condition.action.dto';
import { ConditionActionStateDto } from '../../dto/action-states/condition-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import {
  ConditionService,
  DynamicValue,
  LogicService,
} from 'ts-logic-framework';
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
      const { state, template, debug } = action;
      const checkResult = ConditionService.testCondition(
        state.condition,
        context,
      );
      if (debug) {
        console.debug('Condition check result', template.type, checkResult);
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
      subActionReference: DynamicValue,
    ): Promise<boolean> {
      const { action } = context;
      const { engine, program, template, debug } = action;
      const subActionId = LogicService.resolve<string>(
        subActionReference,
        context,
      );
      if (!program) {
        console.error('Program missing in action', action);
        return false;
      }
      const subAction = program.actions[subActionId];
      if (!subAction) {
        if (debug) {
          console.error('Condition true action not found:', subActionId);
        }
        return false;
      }
      if (subAction) {
        return await engine.tryRun({
          ...context.action,
          actionId: subActionId,
          debug: debug || subAction.debug,
        });
      }
      if (debug) {
        console.debug('Condition has no true case', template.type);
      }
      return false;
    }
  })();
