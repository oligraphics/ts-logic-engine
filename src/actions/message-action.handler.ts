import { MessageActionDto } from '../dto/actions/message.action.dto';
import { MessageActionStateDto } from '../dto/states/message-action.state.dto';
import { TriggerContextDto } from '../dto/contexts/trigger.context.dto';
import { LogicService } from 'ts-logic-framework';
import { ActionHandler } from './action.handler';
import { BuiltinEventTypeEnum } from '../enums/builtin-event-type.enum';
import { MessageEventDto } from '../dto/events/message-event.dto';

export const MessageActionHandler =
  new (class MessageActionHandler extends ActionHandler<
    MessageActionDto,
    MessageActionStateDto
  > {
    tryRun(
      context: TriggerContextDto<MessageActionDto, MessageActionStateDto>,
    ): boolean {
      const { action } = context;
      const { state, debug } = action;
      const message = LogicService.resolve<string>(state.message, context);
      if (!message) {
        if (debug) {
          console.error('Action generated no message', context.action.state);
        }
        return false;
      }

      const variables: { [key: string]: string } = {};
      if (state.variables) {
        for (const [key, valueBuilder] of Object.entries(state.variables)) {
          variables[key] = LogicService.resolve(valueBuilder, context);
        }
      }

      const data: { [key: string]: string } = {};
      if (state.data) {
        for (const [key, valueBuilder] of Object.entries(state.data)) {
          data[key] = LogicService.resolve(valueBuilder, context);
        }
      }

      return context.action.engine.callEvent(
        context.action,
        <MessageEventDto>{
          type: BuiltinEventTypeEnum.MESSAGE,
          message,
          variables,
        },
        (event) => {
          if (context.action.debug) {
            console.log(event.message);
          }
          return true;
        },
      );
    }
  })();
