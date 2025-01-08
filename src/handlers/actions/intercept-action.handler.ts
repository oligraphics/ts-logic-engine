import { ActionHandler } from './action.handler';
import {
  InterceptActionDto,
  InterceptActionStateDto,
} from '../../dto/actions/intercept.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { ActionTriggerDto } from '../../dto/triggers/action.trigger.dto';
import { DynamicContextService, LogicService } from 'ts-logic-framework';
import { EventDto } from '../../dto/events/event.dto';
import { ParamsService } from '../../services/params.service';

export const InterceptActionHandler =
  new (class InterceptActionHandler extends ActionHandler<
    InterceptActionDto,
    InterceptActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>,
    ): Promise<boolean> {
      const trigger = context.trigger as ActionTriggerDto;
      const debug = context.action.debug || trigger.debug;
      const innerContext = {
        ...context.action,
        ...DynamicContextService.createContext({
          event: context.event,
          trigger: context.trigger,
        }),
      };
      const reactionId =
        trigger && trigger.reaction
          ? LogicService.resolve<string>(trigger.reaction, innerContext, debug)
          : undefined;

      if (!reactionId) {
        if (debug) {
          console.debug('Intercept trigger has no reaction property.', trigger);
        }
        return true;
      }

      const reactions = context.action.state.actions ?? {};
      const reaction = reactions[reactionId];
      if (!reaction) {
        if (debug) {
          console.warn(
            'Intercept reaction',
            reactionId,
            'not found. Available:',
            Object.keys(reactions),
          );
        }
        return true;
      }

      if (reaction.change) {
        if (debug) {
          console.debug('Apply changes to event', reaction.change);
        }
        const event = context.event as EventDto & {
          [property: string]: unknown;
        };
        for (const [property, value] of Object.entries(reaction.change)) {
          const previousValue = event[property];
          const modifiedValue = LogicService.resolve(value, {
            ...innerContext,
            ...DynamicContextService.createContext({
              value: previousValue,
            }),
          });
          event[property] = modifiedValue;
          if (debug) {
            console.debug('Change', previousValue, 'to', modifiedValue);
          }
        }
      }

      if (reaction.action) {
        const action = LogicService.resolve<string>(
          reaction.action,
          innerContext,
          debug,
        );
        if (debug) {
          console.debug(
            'Call action ',
            action,
            ' in response to the intercepted event',
            reaction.change,
          );
        }
        if (!action || !context.action.program.actions[action]) {
          if (debug) {
            console.error(
              'Action',
              action,
              'not found in program',
              context.action.program.id,
            );
          }
          return true;
        }

        const params = reaction.params
          ? ParamsService.resolve(reaction.params, innerContext, debug)
          : {};
        await context.action.engine.tryRun({
          params,
          ...DynamicContextService.createContext({
            engine: context.action.engine,
            program: context.action.program,
            initiator: context.action.source,
            source: context.action.source,
            actionId: action,
          }),
        });
      }

      return true;
    }
  })();
