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

export const RepeatActionHandler =
  new (class RepeatActionHandler extends ActionHandler<
    RepeatActionDto,
    RepeatActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>,
    ): Promise<boolean> {
      const repeat =
        LogicService.resolve<number>(context.action.state.repeat, context) ?? 0;
      if (context.action.debug) {
        console.warn(`Repeat action repeats ${repeat} times`);
      }
      if (repeat <= 0) {
        return true;
      }
      const repeatAction = LogicService.resolve<string>(
        context.action.state.action,
        context,
      );
      if (!repeatAction) {
        console.warn(`Repeat action produced no action to repeat`);
        return false;
      }

      const event = <RepeatActionEventDto>{
        type: BuiltinEventTypeEnum.REPEAT_ACTION,
        action: context.action,
        repeat,
        repeatAction,
        params: context.action.state.params ?? {},
        cancelable: true,
      };
      return await context.action.engine.callEvent(
        context.action.source,
        event,
        async (event) => {
          for (let i = 0; i < event.repeat; i++) {
            const params = ParamsService.resolve(
              event.params,
              {
                ...context,
                ...DynamicContextService.createContext({
                  iteration: i,
                }),
              },
              context.action.debug,
            );
            await context.action.engine.tryRun({
              engine: context.action.engine,
              program: context.action.program,
              initiator: context.action.source,
              source: context.action.source,
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
