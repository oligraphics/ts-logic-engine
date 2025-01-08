"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSystem = void 0;
const ts_event_bus_1 = require("ts-event-bus");
const event_phase_enum_1 = require("../enums/event-phase.enum");
const ts_logic_framework_1 = require("ts-logic-framework");
class EventSystem {
    bus = new ts_event_bus_1.EventBus();
    engine;
    listeners = new Map();
    constructor(engine) {
        this.engine = engine;
    }
    async callEvent(source, event, perform, debug) {
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
                    console.debug('Event', event.type, 'was aborted by the perform function');
                }
                return false;
            }
            if (debug) {
                console.debug('Call the event', event.type, 'publicly');
            }
            this.bus.trigger(event.type, event);
            return true;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.ALLOW, debug))) {
            return false;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PREPARE, debug))) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORM, debug))) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (perform && (await perform(event)) === false) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        event.performed = true;
        this.bus.trigger(event.type, event);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORMED, debug);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER, debug);
        return true;
    }
    async _callCanceled(eventListeners, source, event) {
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.CANCELED);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER);
    }
    async _callPhase(eventListeners, source, event, phase, debug) {
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
        const context = ts_logic_framework_1.DynamicContextService.createContext({
            source,
            event,
            phase,
        });
        for (const listener of phaseListeners.values()) {
            let filterResult;
            if (listener.filter) {
                const filterContext = listener.action
                    ? {
                        ...listener.action,
                        ...context,
                    }
                    : context;
                if (listener.debug) {
                    console.log('Action context keys:', Object.keys(listener.action ?? {}));
                    console.log('Listener context keys:', Object.keys(filterContext));
                }
                filterResult = ts_logic_framework_1.ConditionService.testCondition(listener.filter, filterContext);
            }
            else {
                filterResult = true;
            }
            if (filterResult !== true) {
                if (listener.debug) {
                    console.log('Filter no match:', listener.action.program.id, '>', listener.action.actionId, filterResult);
                }
                continue;
            }
            try {
                await listener.action.engine.trigger(listener, event);
            }
            catch (e) {
                console.error(e, 'event:', event, 'listener:', listener);
            }
            if (event.cancelable && event.canceled) {
                return false;
            }
        }
        return !event.cancelable || !event.canceled;
    }
    attachTriggers(triggers) {
        for (const trigger of triggers) {
            const eventListeners = this.listeners.get(trigger.event) ?? new Map();
            const phaseListeners = eventListeners.get(trigger.phase) ??
                new Map();
            phaseListeners.set(trigger.id, trigger);
            eventListeners.set(trigger.phase, phaseListeners);
            this.listeners.set(trigger.event, eventListeners);
            if (trigger.debug) {
                console.debug('Attach trigger', trigger.event, '>', trigger.phase);
            }
        }
    }
    detachTriggers(triggers) {
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
exports.EventSystem = EventSystem;
//# sourceMappingURL=event-system.model.js.map