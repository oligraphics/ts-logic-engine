import { ProgramActionDto, ProgramActionStateDto } from '../../dto/actions/program.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const ProgramActionHandler: {
    tryRun(context: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<ProgramActionDto, ProgramActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<ProgramActionDto, ProgramActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>): void;
};
//# sourceMappingURL=program-action.handler.d.ts.map