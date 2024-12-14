import { EventDto } from '../dto/events/event.dto';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { ITriggerContext } from './trigger-context.interface';
import { IActionInstance } from './action-instance.interface';
export interface IActionHandler {
    apply(context: ITriggerContext): boolean;
    trigger(context: ITriggerContext): boolean;
    perform(context: ITriggerContext, callNext: boolean): boolean;
    remove(action: IActionInstance): void;
    onEvent(action: IActionInstance, event: EventDto, phase: EventPhaseEnum): void;
    setAttached(status: StatusStateDto, triggerContext: ITriggerContext): void;
}
//# sourceMappingURL=action-handler.interface.d.ts.map