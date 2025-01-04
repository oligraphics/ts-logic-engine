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
    perform?: (event: T) => Promise<boolean | void>,
    debug?: boolean,
  ): Promise<boolean> {
    if (debug) {
      console.debug('Call event', event.type);
    }
    const eventListeners = this.listeners.get(event.type);
    if (!eventListeners) {
      if (debug) {
        console.debug('No event listeners for event', event.type);
      }
      if (perform && (await perform(event)) === false) {
        if (debug) {
          console.debug(
            'Event',
            event.type,
            'was aborted by the perform function',
          );
        }
        return false;
      }
      if (debug) {
        console.debug('Call the event', event.type, 'publicly');
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
        debug,
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
        debug,
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
        debug,
      ))
    ) {
      await this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (perform && (await perform(event)) === false) {
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
      debug,
    );
    await this._callPhase(
      eventListeners,
      source,
      event,
      EventPhaseEnum.AFTER,
      debug,
    );
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
    debug?: boolean,
  ): Promise<boolean> {
    if (debug) {
      console.debug('Call phase', phase, 'for event', event.type);
    }
    const phaseListeners = eventListeners.get(phase);
    if (!phaseListeners || phaseListeners.size === 0) {
      if (debug) {
        console.debug(0, 'listeners found');
      }
      return !event.cancelable || !event.canceled;
    }
    if (debug) {
      console.debug(phaseListeners.size, 'listeners found');
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
