import { DummyActionDto, DummyActionStateDto } from '../../dto/actions/dummy.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const DummyActionHandler: {
    tryRun(context: TriggerContextDto<DummyActionDto, DummyActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<DummyActionDto, object>): Promise<boolean>;
    trigger(context: TriggerContextDto<DummyActionDto, object>): Promise<boolean>;
    perform(context: TriggerContextDto<DummyActionDto, object>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<DummyActionDto, object>): void;
    onEvent(action: import("../..").ActionInstanceDto<DummyActionDto, object>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<DummyActionDto, object>): void;
};
//# sourceMappingURL=dummy-action.handler.d.ts.map