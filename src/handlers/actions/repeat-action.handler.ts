import { ActionHandler } from './action.handler';
import {
  RepeatActionDto,
  RepeatActionStateDto,
} from '../../dto/actions/repeat.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { DynamicContextService, LogicService } from 'ts-logic-framework';
import { RepeatActionEventDto } from '../../dto/events/repeat-action.event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { ParamsService } from '../../services/params.service';
import { ITargetable } from '../../interfaces/target.interface';
import { IActor } from '../../interfaces/actor.interface';

export const RepeatActionHandler =
  new (class RepeatActionHandler extends ActionHandler<
    RepeatActionDto,
    RepeatActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>,
    ): Promise<boolean> {
      const { action } = context;
      const { state, debug } = action;
      const innerContext = {
        ...context,
        ...action,
      };

      const repeat =
        LogicService.resolve<number>(state.repeat, innerContext) ?? 0;
      if (debug) {
        console.warn(`Repeat action repeats ${repeat} times`);
      }
      if (repeat <= 0) {
        return true;
      }
      const repeatAction = LogicService.resolve<string>(
        state.action,
        innerContext,
      );
      if (!repeatAction) {
        console.warn(`Repeat action produced no action to repeat`);
        return false;
      }

      const event = <RepeatActionEventDto>{
        type: BuiltinEventTypeEnum.REPEAT_ACTION,
        repeat,
        repeatAction,
        params: state.params ?? {},
        cancelable: true,
      };
      return await action.engine.callEvent(
        action,
        event,
        async (event) => {
          for (let i = 0; i < event.repeat; i++) {
            const params = ParamsService.resolve(
              event.params,
              {
                ...innerContext,
                ...DynamicContextService.createContext({
                  iteration: i,
                }),
              },
              debug,
            );
            await action.engine.tryRun({
              engine: action.engine,
              program: action.program,
              initiator: action.source,
              source:
                (action.target as IActor)?.id !== undefined
                  ? (action.target as IActor)
                  : action.source,
              actionId: repeatAction,
              params,
            });
          }
          return true;
        },
        context.action.debug,
      );
    }
  })();
