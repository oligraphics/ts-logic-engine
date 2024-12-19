import { InterceptActionDto } from '../../dto/actions/intercept.action.dto';
import { InterceptActionStateDto } from '../../dto/action-states/intercept-action.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { EventDto } from '../../dto/events/event.dto';
export declare const InterceptActionHandler: {
    tryRun(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): boolean;
    apply(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): boolean;
    trigger(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): boolean;
    perform(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>, callNext: boolean): boolean;
    remove(action: import("../..").ActionInstanceDto<InterceptActionDto, InterceptActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<InterceptActionDto, InterceptActionStateDto>, event: EventDto, phase: import("../..").EventPhaseEnum): void;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): void;
};
//# sourceMappingURL=intercept-action.handler.d.ts.map