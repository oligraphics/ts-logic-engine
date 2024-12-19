import { EventBus } from 'ts-event-bus';
import { EventDto } from '../dto/events/event.dto';
import { IEventSource } from '../interfaces/event-source.interface';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { ConditionService, DynamicContextService } from 'ts-logic-framework';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { LogicEngine } from '../engine/logic.engine';
type EventListeners = Map<string, PhaseListeners>;
type PhaseListeners = Map<string, ITriggerInstance>;

export class EventSystem {
  readonly bus: EventBus = new EventBus();
  readonly engine: LogicEngine;

  private readonly listeners = new Map<string, EventListeners>();

  constructor(engine: LogicEngine) {
    this.engine = engine;
  }

  callEvent<T extends EventDto>(
    source: IEventSource,
    event: T,
    perform?: (event: T) => boolean,
  ): boolean {
    const eventListeners = this.listeners.get(event.type);
    if (!eventListeners) {
      if (perform && !perform(event)) {
        return false;
      }
      this.bus.trigger(event.type, event);
      return true;
    }
    if (!this._callPhase(eventListeners, source, event, EventPhaseEnum.ALLOW)) {
      return false;
    }
    if (
      !this._callPhase(eventListeners, source, event, EventPhaseEnum.PREPARE)
    ) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (
      !this._callPhase(eventListeners, source, event, EventPhaseEnum.PERFORM)
    ) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (perform && !perform(event)) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    event.performed = true;
    this.bus.trigger(event.type, event);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.PERFORMED);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
    return true;
  }

  _callCanceled(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
  ) {
    this._callPhase(eventListeners, source, event, EventPhaseEnum.CANCELED);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
  }

  _callPhase(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
    phase: EventPhaseEnum,
  ): boolean {
    const phaseListeners = eventListeners.get(phase);
    if (!phaseListeners) {
      return !event.cancelable || !event.canceled;
    }
    const context = DynamicContextService.createContext({
      source,
      event,
      phase,
    });
    for (const listener of phaseListeners.values()) {
      const filterResult = listener.filter
        ? ConditionService.testCondition(listener.filter, context)
        : true;
      if (filterResult !== true) {
        if (listener.debug) {
          console.log(
            'Filter no match:',
            listener.action.program.id,
            '>',
            listener.action.actionId,
            filterResult,
          );
        }
        continue;
      }

      try {
        listener.action.engine.trigger(listener, event);
      } catch (e) {
        console.error(e);
      }

      if (event.cancelable && event.canceled) {
        return false;
      }
    }

    return !event.cancelable || !event.canceled;
  }

  attachTriggers(triggers: ITriggerInstance[]) {
    for (const trigger of triggers) {
      const eventListeners =
        this.listeners.get(trigger.event) ?? new Map<string, PhaseListeners>();
      const phaseListeners =
        eventListeners.get(trigger.phase) ??
        new Map<string, ITriggerInstance>();
      phaseListeners.set(trigger.id, trigger);
      eventListeners.set(trigger.phase, phaseListeners);
      this.listeners.set(trigger.event, eventListeners);
    }
  }

  detachTriggers(triggers: ITriggerInstance[]) {
    for (const trigger of triggers) {
      const eventListeners = this.listeners.get(trigger.event);
      if (eventListeners) {
        const phaseListeners = eventListeners.get(trigger.phase);
        if (phaseListeners) {
          phaseListeners.delete(trigger.id);
        }
      }
    }
  }
}
