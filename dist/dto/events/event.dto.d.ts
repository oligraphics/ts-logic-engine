import { ITargetable } from '../../interfaces/target.interface';
import { IEventSource } from '../../interfaces/event-source.interface';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { IActor } from '../../interfaces/actor.interface';
export type EventDto = {
    type: string;
    action?: IActionInstance;
    initiator?: IActor;
    source?: IEventSource;
    target?: ITargetable;
    cancelable?: boolean;
    performed?: boolean;
    canceled?: boolean;
};
//# sourceMappingURL=event.dto.d.ts.map