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

  async callEvent<T extends EventDto>(
    source: IEventSource,
    event: T,
    perform?: (event: T) => Promise<boolean>,
  ): Promise<boolean> {
    const eventListeners = this.listeners.get(event.type);
    if (!eventListeners) {
      if (perform && !(await perform(event))) {
        return false;
      }
      this.bus.trigger(event.type, event);
      return true;
    }
    if (
      !(await this._callPhase(
        eventListeners,
        source,
        event,
        EventPhaseEnum.ALLOW,
      ))
    ) {
      return false;
    }
    if (
      !(await this._callPhase(
        eventListeners,
        source,
        event,
        EventPhaseEnum.PREPARE,
      ))
    ) {
      await this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (
      !(await this._callPhase(
        eventListeners,
        source,
        event,
        EventPhaseEnum.PERFORM,
      ))
    ) {
      await this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (perform && !(await perform(event))) {
      await this._callCanceled(eventListeners, source, event);
      return false;
    }
    event.performed = true;
    this.bus.trigger(event.type, event);
    await this._callPhase(
      eventListeners,
      source,
      event,
      EventPhaseEnum.PERFORMED,
    );
    await this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
    return true;
  }

  async _callCanceled(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
  ) {
    await this._callPhase(
      eventListeners,
      source,
      event,
      EventPhaseEnum.CANCELED,
    );
    await this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
  }

  async _callPhase(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
    phase: EventPhaseEnum,
  ): Promise<boolean> {
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
        await listener.action.engine.trigger(listener, event);
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
      if (trigger.debug) {
        console.debug('Attach trigger', trigger.event, '>', trigger.phase);
      }
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
      if (trigger.debug) {
        console.debug('Detach trigger', trigger.event, '>', trigger.phase);
      }
    }
  }
}
