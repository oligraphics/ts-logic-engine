import { MessageActionDto } from '../../dto/actions/message.action.dto';
import { MessageActionStateDto } from '../../dto/action-states/message-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const MessageActionHandler: {
    tryRun(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): boolean;
    apply(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): boolean;
    trigger(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): boolean;
    perform(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>, callNext: boolean): boolean;
    remove(action: import("../..").ActionInstanceDto<MessageActionDto, MessageActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<MessageActionDto, MessageActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): void;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<MessageActionDto, MessageActionStateDto>): void;
};
//# sourceMappingURL=message-action.handler.d.ts.map