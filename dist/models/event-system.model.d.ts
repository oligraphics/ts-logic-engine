import { EventBus } from 'ts-event-bus';
import { EventDto } from '../dto/events/event.dto';
import { IEventSource } from '../interfaces/event-source.interface';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { LogicEngine } from '../engine/logic.engine';
type EventListeners = Map<string, PhaseListeners>;
type PhaseListeners = Map<string, ITriggerInstance>;
export declare class EventSystem {
    readonly bus: EventBus;
    readonly engine: LogicEngine;
    private readonly listeners;
    constructor(engine: LogicEngine);
    callEvent<T extends EventDto>(source: IEventSource, event: T, perform?: (event: T) => Promise<boolean>): Promise<boolean>;
    _callCanceled(eventListeners: EventListeners, source: IEventSource, event: EventDto): Promise<void>;
    _callPhase(eventListeners: EventListeners, source: IEventSource, event: EventDto, phase: EventPhaseEnum): Promise<boolean>;
    attachTriggers(triggers: ITriggerInstance[]): void;
    detachTriggers(triggers: ITriggerInstance[]): void;
}
export {};
//# sourceMappingURL=event-system.model.d.ts.map