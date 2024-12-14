"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicEngine = void 0;
const ts_event_bus_1 = require("ts-event-bus");
const action_builder_service_1 = require("../services/action-builder.service");
const ts_logic_framework_1 = require("ts-logic-framework");
const target_service_1 = require("../services/target.service");
const event_phase_enum_1 = require("../enums/event-phase.enum");
const builtin_event_type_enum_1 = require("../enums/builtin-event-type.enum");
class LogicEngine {
    context;
    program;
    actionResolvers;
    eventSystem;
    _state = undefined;
    _listeningActions = new Map();
    get id() {
        return '__root__';
    }
    get name() {
        return 'Root';
    }
    get state() {
        return this._state;
    }
    get bus() {
        return this.eventSystem.bus;
    }
    // noinspection JSUnusedGlobalSymbols
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
    constructor(program, context, actionResolvers) {
        this.context = {
            engine: this,
            actors: context.actors ?? [],
            programs: context.programs ?? [],
        };
        this.program = program;
        this.actionResolvers = actionResolvers;
        this.eventSystem = new EventSystem(this);
    }
    start() {
        this.bus.trigger('start');
        this.tryRun({
            ...this.context,
            ...ts_logic_framework_1.DynamicContextService.createContext({
                program: this.program,
                actionId: this.program.main ?? 'main',
                initiator: this,
                source: this,
            }),
        });
    }
    update(deltaTime) {
        this.bus.trigger('update', deltaTime);
    }
    tryRun(context) {
        return this.callEvent(context.source, {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.PROGRAM,
            engine: context.engine,
            program: context.program,
            initiator: context.initiator,
            source: context.source,
        }, () => this.run(context));
    }
    run(context) {
        const action = context.program.actions[context.actionId];
        if (!action) {
            console.error('Action', context.actionId, 'not found in program', context.program.id, '. Available:', ...Object.keys(context.program.actions));
        }
        const targets = action.target
            ? target_service_1.TargetService.resolveTargets(action.target, {
                ...context,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    action,
                }),
            }, context.program.debug || action.debug)
            : [context.source];
        if (targets.length === 0) {
            if (context.program.debug) {
                console.error('Action', context.actionId, 'in program', context.program.id, 'provided no valid target.');
            }
            return false;
        }
        for (const target of targets) {
            this.apply({
                ...context,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    target,
                    action,
                }),
            });
        }
        return true;
    }
    apply(context) {
        const resolver = this.actionResolvers[context.action.type];
        if (!resolver) {
            throw new Error(`No resolver found for action of type ${context.action.type}\n${JSON.stringify(context.action, null, 2)}`);
        }
        const createContext = {
            ...context,
            ...ts_logic_framework_1.DynamicContextService.createContext({
                ...(context.action.properties ?? {}),
                ...(context.action.computed ?? {}),
            }),
        };
        const instance = action_builder_service_1.ActionBuilderService.build(createContext);
        return this.callEvent(context.source, {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.ACTION,
            action: instance,
        }, () => {
            return resolver.apply({
                ...createContext,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    engine: this,
                    action: instance,
                }),
            });
        });
    }
    stop() {
        this.bus.trigger('stop');
    }
    get allowTargeting() {
        return true;
    }
    getValue(property, debug) {
        switch (property) {
            case 'state':
                return this.state;
            default:
                if (debug) {
                    console.error(`Trying to read unknown property ${property} on LogicEngine`);
                }
                return undefined;
        }
    }
    callEvent(source, event, perform) {
        return this.eventSystem.callEvent(source, event, perform);
    }
    trigger(trigger, event) {
        const handler = this.actionResolvers[trigger.action.action.type];
        if (!handler) {
            throw new Error(`No resolver found for action of type ${trigger.action.action.type}\n${JSON.stringify(trigger.action.action, null, 2)}`);
        }
        handler.trigger({
            trigger,
            event,
            action: trigger.action,
        });
    }
    attachTriggers(action) {
        this._listeningActions.set(action.id, action);
        if (action.triggers) {
            this.eventSystem.attachTriggers(action.triggers);
        }
    }
    detachTriggers(action) {
        this._listeningActions.delete(action.id);
        if (action.triggers) {
            this.eventSystem.detachTriggers(action.triggers);
        }
    }
}
exports.LogicEngine = LogicEngine;
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
//# sourceMappingURL=logic.engine.js.map