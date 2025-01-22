import {
  MessageActionDto,
  MessageActionStateDto,
} from '../../dto/actions/message.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { LogicService } from 'ts-logic-framework';
import { ActionHandler } from './action.handler';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { MessageEventDto } from '../../dto/events/message.event.dto';

export const MessageActionHandler =
  new (class MessageActionHandler extends ActionHandler<
    MessageActionDto,
    MessageActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<MessageActionDto, MessageActionStateDto>,
    ): Promise<boolean> {
      const { action } = context;
      const { state, debug } = action;
      const innerContext = {
        ...context,
        ...action,
      };
      const message = LogicService.resolve<string>(
        state.message,
        innerContext,
        debug,
      );
      if (!message) {
        if (debug) {
          console.error('Action generated no message', state);
        }
        return false;
      }

      const variables: { [key: string]: string } = {};
      if (state.variables) {
        for (const [key, valueBuilder] of Object.entries(state.variables)) {
          variables[key] =
            LogicService.resolve(valueBuilder, innerContext, debug) ?? '';
        }
      }

      const data: { [key: string]: string | undefined } = {};
      if (state.data) {
        for (const [key, valueBuilder] of Object.entries(state.data)) {
          data[key] = LogicService.resolve(valueBuilder, innerContext, debug);
        }
      }

      return await action.engine.callEvent(
        action,
        <MessageEventDto>{
          type: BuiltinEventTypeEnum.MESSAGE,
          message,
          variables,
          data,
        },
        async (event) => {
          if (debug) {
            console.log('DEBUG Message:', event.message);
          }
          return true;
        },
        debug,
      );
    }
  })();
