import { MessageActionDto, MessageActionStateDto } from '../../dto/actions/message.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const MessageActionHandler: {
    tryRun(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<MessageActionDto, MessageActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<MessageActionDto, MessageActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<MessageActionDto, MessageActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<MessageActionDto, MessageActionStateDto>): void;
};
//# sourceMappingURL=message-action.handler.d.ts.map