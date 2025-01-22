import { AsyncEventBus } from 'ts-event-bus';
import { EventDto } from '../dto/events/event.dto';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { LogicEngine } from '../engine/logic.engine';
type EventListeners = Map<string, PhaseListeners>;
type PhaseListeners = Map<string, ITriggerInstance>;
export declare class EventSystem {
    readonly bus: AsyncEventBus;
    readonly engine: LogicEngine;
    private readonly listeners;
    constructor(engine: LogicEngine);
    callEvent<T extends EventDto>(event: T, perform?: (event: T) => Promise<boolean | void> | void, debug?: boolean): Promise<boolean>;
    _callCanceled(eventListeners: EventListeners, event: EventDto): Promise<void>;
    _callPhase(eventListeners: EventListeners, event: EventDto, phase: EventPhaseEnum, debug?: boolean): Promise<boolean>;
    attachTriggers(triggers: ITriggerInstance[], debug?: boolean): void;
    detachTriggers(triggers: ITriggerInstance[], debug?: boolean): void;
}
export {};
//# sourceMappingURL=event-system.model.d.ts.map