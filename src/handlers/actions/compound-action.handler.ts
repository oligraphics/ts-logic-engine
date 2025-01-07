import {
  CompoundActionDto,
  CompoundActionStateDto,
} from '../../dto/actions/compound.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { LogicService } from 'ts-logic-framework';
import { ActionHandler } from './action.handler';

export const CompoundActionHandler =
  new (class CompoundActionHandler extends ActionHandler<
    CompoundActionDto,
    CompoundActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>,
    ): Promise<boolean> {
      const debug = context.action.debug;
      for (const subActionReference of context.action.state.compound) {
        const subActionId = LogicService.resolve<string>(
          subActionReference,
          context,
        );
        if (!subActionId) {
          if (debug) {
            console.error(
              'Compound entry provided no action id:',
              subActionReference,
            );
          }
          continue;
        }
        if (
          !(await context.action.engine.tryRun({
            ...context.action,
            actionId: subActionId,
            debug: context.action.debug,
          }))
        ) {
          if (context.action.debug) {
            console.warn('Compound action', subActionId, 'failed.');
          }
        }
      }
      return true;
    }
  })();
