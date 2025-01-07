import {
  CompoundActionDto,
  CompoundActionStateDto,
} from '../../dto/actions/compound.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { DynamicContextService, LogicService } from 'ts-logic-framework';
import { ActionHandler } from './action.handler';
import { ParamsService } from '../../services/params.service';

export const CompoundActionHandler =
  new (class CompoundActionHandler extends ActionHandler<
    CompoundActionDto,
    CompoundActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>,
    ): Promise<boolean> {
      const debug = context.action.debug;
      const params = context.action.state.params
        ? ParamsService.resolve(context.action.state.params, context.action)
        : {};
      const innerContext = DynamicContextService.createContext(
        {
          engine: context.action.engine,
          program: context.action.program,
          initiator: context.action.initiator,
          source: context.action.source,
          debug,
        },
        params,
      );
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
            ...innerContext,
            actionId: subActionId,
          }))
        ) {
          if (debug) {
            console.warn('Compound action', subActionId, 'failed.');
          }
        }
      }
      return true;
    }
  })();
