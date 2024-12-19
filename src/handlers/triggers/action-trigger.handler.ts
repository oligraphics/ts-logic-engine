import { TriggerHandler } from './trigger.handler';
import { ITriggerInstance } from '../../interfaces/trigger-instance.interface';
import { EventDto } from '../../dto/events/event.dto';

export const ActionTriggerHandler =
  new (class ActionTriggerHandler extends TriggerHandler<ITriggerInstance> {
    async handle(trigger: ITriggerInstance, event: EventDto) {
      const handler = trigger.action.engine.getActionHandler(
        trigger.action.action.type,
      );
      if (!handler) {
        throw new Error(
          `No action handler found for action of type ${
            trigger.action.action.type
          }\n${JSON.stringify(trigger.action.action, null, 2)}`,
        );
      }
      await handler.trigger({
        trigger,
        event,
        action: trigger.action,
      });
    }
  })();
