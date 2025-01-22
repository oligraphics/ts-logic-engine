import { IActor } from './actor.interface';
import { ITargetable } from './target.interface';
import { IActionInstance } from './action-instance.interface';
import { ActionDto } from '../dto/actions/action.dto';
export type IEventSource = {
    action?: ActionDto | IActionInstance;
    initiator: IActor;
    source: unknown;
    target: ITargetable;
};
//# sourceMappingURL=event-source.interface.d.ts.map