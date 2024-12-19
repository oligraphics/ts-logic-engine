import { CompoundActionDto } from '../../dto/actions/compound.action.dto';
import { CompoundActionStateDto } from '../../dto/action-states/compound-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const CompoundActionHandler: {
    tryRun(context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<CompoundActionDto, CompoundActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<CompoundActionDto, CompoundActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<CompoundActionDto, CompoundActionStateDto>): void;
};
//# sourceMappingURL=compound-action.handler.d.ts.map