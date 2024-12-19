import { EventDto } from '../dto/events/event.dto';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { ITriggerContext } from './trigger-context.interface';
import { IActionInstance } from './action-instance.interface';
export interface IActionHandler {
    apply(context: ITriggerContext): Promise<boolean>;
    trigger(context: ITriggerContext): Promise<boolean>;
    perform(context: ITriggerContext, callNext: boolean): Promise<boolean>;
    remove(action: IActionInstance): void;
    onEvent(action: IActionInstance, event: EventDto, phase: EventPhaseEnum): Promise<void>;
    setAttached(status: StatusStateDto, triggerContext: ITriggerContext): void;
}
//# sourceMappingURL=action-handler.interface.d.ts.map