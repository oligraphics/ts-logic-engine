import { RepeatActionDto, RepeatActionStateDto } from '../../dto/actions/repeat.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const RepeatActionHandler: {
    tryRun(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<RepeatActionDto, RepeatActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<RepeatActionDto, RepeatActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): void;
};
//# sourceMappingURL=repeat-action.handler.d.ts.map