import { InterceptActionDto, InterceptActionStateDto } from '../../dto/actions/intercept.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { EventDto } from '../../dto/events/event.dto';
export declare const InterceptActionHandler: {
    tryRun(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): Promise<boolean>;
    apply(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<InterceptActionDto, InterceptActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<InterceptActionDto, InterceptActionStateDto>, event: EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<InterceptActionDto, InterceptActionStateDto>): void;
};
//# sourceMappingURL=intercept-action.handler.d.ts.map