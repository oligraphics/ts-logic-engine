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
    callEvent(source, event, perform) {
        const eventListeners = this.listeners.get(event.type);
        if (!eventListeners) {
            if (perform && !perform(event)) {
                return false;
            }
            this.bus.trigger(event.type, event);
            return true;
        }
        if (!this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.ALLOW)) {
            return false;
        }
        if (!this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PREPARE)) {
            this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (!this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORM)) {
            this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (perform && !perform(event)) {
            this._callCanceled(eventListeners, source, event);
            return false;
        }
        event.performed = true;
        this.bus.trigger(event.type, event);
        this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORMED);
        this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER);
        return true;
    }
    _callCanceled(eventListeners, source, event) {
        this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.CANCELED);
        this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER);
    }
    _callPhase(eventListeners, source, event, phase) {
        const phaseListeners = eventListeners.get(phase);
        if (!phaseListeners) {
            return !event.cancelable || !event.canceled;
        }
        const context = ts_logic_framework_1.DynamicContextService.createContext({
            source,
            event,
            phase,
        });
        for (const listener of phaseListeners.values()) {
            const filterResult = listener.filter
                ? ts_logic_framework_1.ConditionService.testCondition(listener.filter, context)
                : true;
            if (filterResult !== true) {
                if (listener.debug) {
                    console.log('Filter no match:', listener.action.program.id, '>', listener.action.actionId, filterResult);
                }
                continue;
            }
            try {
                listener.action.engine.trigger(listener, event);
            }
            catch (e) {
                console.error(e);
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
        }
    }
}
exports.EventSystem = EventSystem;
//# sourceMappingURL=event-system.model.js.map