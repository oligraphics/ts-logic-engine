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
    async callEvent(source, event, perform) {
        const eventListeners = this.listeners.get(event.type);
        if (!eventListeners) {
            if (perform && !(await perform(event))) {
                return false;
            }
            this.bus.trigger(event.type, event);
            return true;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.ALLOW))) {
            return false;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PREPARE))) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (!(await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORM))) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        if (perform && !(await perform(event))) {
            await this._callCanceled(eventListeners, source, event);
            return false;
        }
        event.performed = true;
        this.bus.trigger(event.type, event);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.PERFORMED);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER);
        return true;
    }
    async _callCanceled(eventListeners, source, event) {
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.CANCELED);
        await this._callPhase(eventListeners, source, event, event_phase_enum_1.EventPhaseEnum.AFTER);
    }
    async _callPhase(eventListeners, source, event, phase) {
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
                await listener.action.engine.trigger(listener, event);
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