import { CompoundActionDto } from '../../dto/actions/compound.action.dto';
import { CompoundActionStateDto } from '../../dto/action-states/compound-action.state.dto';
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
      for (const subActionReference of context.action.state.compound) {
        const subActionId = LogicService.resolve<string>(
          subActionReference,
          context,
        );
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
