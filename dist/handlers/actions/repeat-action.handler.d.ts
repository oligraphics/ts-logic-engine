import { RepeatActionDto } from '../../dto/actions/repeat.action.dto';
import { RepeatActionStateDto } from '../../dto/action-states/repeat-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const RepeatActionHandler: {
    tryRun(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): boolean;
    apply(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): boolean;
    trigger(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): boolean;
    perform(context: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>, callNext: boolean): boolean;
    remove(action: import("../..").ActionInstanceDto<RepeatActionDto, RepeatActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<RepeatActionDto, RepeatActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): void;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<RepeatActionDto, RepeatActionStateDto>): void;
};
//# sourceMappingURL=repeat-action.handler.d.ts.map