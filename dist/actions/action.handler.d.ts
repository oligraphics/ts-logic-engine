import { EventDto } from '../dto/events/event.dto';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { TriggerContextDto } from '../dto/contexts/trigger.context.dto';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { ActionDto } from '../dto/actions/action.dto';
import { ActionStateDto } from '../dto/states/action.state.dto';
import { ActionInstanceDto } from '../dto/instances/action.instance.dto';
export declare abstract class ActionHandler<TAction extends ActionDto, TActionState extends ActionStateDto> implements IActionHandler {
    apply(context: TriggerContextDto<TAction, TActionState>): boolean;
    trigger(context: TriggerContextDto<TAction, TActionState>): boolean;
    perform(context: TriggerContextDto<TAction, TActionState>, callNext: boolean): boolean;
    abstract tryRun(context: TriggerContextDto<TAction, TActionState>): boolean;
    remove(context: ActionInstanceDto<TAction, TActionState>): void;
    onEvent(action: ActionInstanceDto<TAction, TActionState>, event: EventDto, phase: EventPhaseEnum): void;
    setAttached(effect: StatusStateDto, triggerContext: TriggerContextDto<TAction, TActionState>): void;
}
//# sourceMappingURL=action.handler.d.ts.map