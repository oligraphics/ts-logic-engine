import { DummyActionDto } from '../../dto/actions/dummy.action.dto';
import { DummyActionStateDto } from '../../dto/action-states/dummy-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
export declare const DummyActionHandler: {
    tryRun(context: TriggerContextDto<DummyActionDto, DummyActionStateDto>): boolean;
    apply(context: TriggerContextDto<DummyActionDto, object>): boolean;
    trigger(context: TriggerContextDto<DummyActionDto, object>): boolean;
    perform(context: TriggerContextDto<DummyActionDto, object>, callNext: boolean): boolean;
    remove(action: import("../..").ActionInstanceDto<DummyActionDto, object>): void;
    onEvent(action: import("../..").ActionInstanceDto<DummyActionDto, object>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): void;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<DummyActionDto, object>): void;
};
//# sourceMappingURL=dummy-action.handler.d.ts.map