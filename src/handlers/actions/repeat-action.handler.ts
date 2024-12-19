import { ActionHandler } from './action.handler';
import { RepeatActionDto } from '../../dto/actions/repeat.action.dto';
import { RepeatActionStateDto } from '../../dto/action-states/repeat-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { DynamicContextService, LogicService } from 'ts-logic-framework';
import { RepeatActionEventDto } from '../../dto/events/repeat-action.event.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';

export const RepeatActionHandler =
  new (class RepeatActionHandler extends ActionHandler<
    RepeatActionDto,
    RepeatActionStateDto
  > {
    tryRun(
      context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>,
    ): boolean {
      const repeat = LogicService.resolve<number>(
        context.action.state.repeat,
        context,
      );
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
      return context.action.engine.callEvent(
        context.action.source,
        event,
        (event) => {
          for (let i = 0; i < event.repeat; i++) {
            const params = Object.fromEntries(
              Object.entries(event.params).map(([key, value]) => [
                key,
                LogicService.resolve(value, {
                  ...context,
                  ...DynamicContextService.createContext({
                    iteration: i,
                  }),
                }),
              ]),
            );
            context.action.engine.tryRun({
              engine: context.action.engine,
              program: context.action.program,
              initiator: context.action.source,
              source: context.action.source,
              actionId: repeatAction,
              ...DynamicContextService.createContext({ iteration: i }, params),
            });
          }
          return true;
        },
      );
    }
  })();
