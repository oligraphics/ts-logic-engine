import {
  ConditionActionDto,
  ConditionActionStateDto,
} from '../../dto/actions/condition.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import {
  ConditionService,
  Computable,
  LogicService,
  DynamicContextService,
} from 'ts-logic-framework';
import { ActionHandler } from './action.handler';
import { ParamsService } from '../../services/params.service';

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
          if (debug) {
            console.debug('Run true case');
          }
          return await this.handleCase(context, state.true);
        } else if (debug) {
          console.debug('Condition action provides no true case', state);
        }
      } else {
        if (state.false) {
          if (debug) {
            console.debug('Run false case');
          }
          return await this.handleCase(context, state.false);
        } else if (debug) {
          console.debug('Condition action provides no false case', state);
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
      if (debug) {
        console.debug('Run', subActionId);
      }
      const params = action.state.params
        ? ParamsService.resolve(action.state.params, context.action)
        : {};
      return await engine.tryRun({
        ...DynamicContextService.createContext(
          {
            engine: context.action.engine,
            program: context.action.program,
            initiator: context.action.initiator,
            source: context.action.source,
            actionId: subActionId,
            debug: debug || subAction.debug,
          },
          params,
        ),
      });
    }
  })();
