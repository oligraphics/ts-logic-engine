"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicEngine = void 0;
const action_builder_service_1 = require("../services/action-builder.service");
const ts_logic_framework_1 = require("ts-logic-framework");
const target_service_1 = require("../services/target.service");
const builtin_event_type_enum_1 = require("../enums/builtin-event-type.enum");
const event_system_model_1 = require("../models/event-system.model");
const builtin_trigger_handlers_interface_1 = require("../interfaces/builtin-trigger-handlers.interface");
class LogicEngine {
    context;
    program;
    triggerHandlers;
    actionHandlers;
    programs;
    eventSystem;
    _listeningStackActions = new Map();
    _listeningActions = new Map();
    get id() {
        return '__root__';
    }
    get name() {
        return 'Root';
    }
    get allowTargeting() {
        return true;
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
    constructor(program, options) {
        this.context = {
            ...(options.globalContext ?? {}),
            ...ts_logic_framework_1.DynamicContextService.createContext({
                engine: this,
                actors: options.actors ?? [],
                programs: options.programs ?? [],
            }),
        };
        this.program = program;
        this.programs = options.programs ?? [];
        this.actionHandlers = options.actionHandlers;
        this.triggerHandlers = options.triggerHandlers ?? {
            ...builtin_trigger_handlers_interface_1.BuiltinTriggerHandlers,
        };
        this.eventSystem = new event_system_model_1.EventSystem(this);
    }
    async start() {
        this.bus.trigger('start');
        if (this.program) {
            await this.tryRun({
                engine: this,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    program: this.program,
                    actionId: this.program.main ?? 'main',
                    initiator: this,
                    source: this,
                }),
            });
        }
    }
    stop() {
        this.bus.trigger('stop');
    }
    getActionHandler(actionType) {
        return this.actionHandlers[actionType];
    }
    update(deltaTime) {
        this.bus.trigger('update', deltaTime);
    }
    async tryRun(context) {
        return await this.callEvent(context.source, {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.PROGRAM,
            engine: context.engine,
            program: context.program,
            initiator: context.initiator,
            source: context.source,
            params: context.params,
        }, () => this.run({
            ...this.context,
            ...context,
        }), context.program.debug);
    }
    async run(context) {
        const action = context.program.actions[context.actionId];
        if (!action) {
            console.error('Action', context.actionId, 'not found in program', context.program.id, '. Available:', ...Object.keys(context.program.actions));
        }
        const actionContext = {
            ...ts_logic_framework_1.DynamicContextService.createContext({
                engine: context.engine,
                initiator: context.initiator,
                source: context.source,
                program: context.program,
                actionId: context.actionId,
                action,
                ...(action.properties ?? {}),
                ...(action.computed ?? {}),
            }, context.params ?? {}),
        };
        const targets = target_service_1.TargetService.resolveTargets(action, actionContext, context.program.debug || action.debug) ?? [context.source];
        if (targets.length === 0) {
            if (context.program.debug) {
                console.error('Action', context.actionId, 'in program', context.program.id, 'provided no valid target.');
            }
            return false;
        }
        for (const target of targets) {
            await this.apply({
                params: context.params ?? {},
                ...actionContext,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    target,
                }),
            });
        }
        return true;
    }
    apply(context) {
        const resolver = this.actionHandlers[context.action.type];
        if (!resolver) {
            throw new Error(`No action handler found for action of type ${context.action.type}\n${JSON.stringify(context.action, null, 2)}`);
        }
        const instance = action_builder_service_1.ActionBuilderService.build(context, { ...context.action.properties, ...context.action.computed }, context.params);
        return this.callEvent(context.source, {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.ACTION,
            action: instance,
            cancelable: true,
        }, () => {
            return resolver.apply({
                ...context,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    engine: this,
                    action: instance,
                }),
            });
        }, context.action.debug);
    }
    async callEvent(source, event, perform, debug) {
        return await this.eventSystem.callEvent(source, event, perform, debug);
    }
    async trigger(trigger, event) {
        const handler = this.triggerHandlers[trigger.type];
        if (!handler) {
            throw new Error(`No trigger handler found for trigger of type ${trigger.type}\n${JSON.stringify(trigger.action.action, null, 2)}`);
        }
        await handler.handle(trigger, event);
    }
    remove(action) {
        if (action.debug) {
            console.debug('Remove action', action.program.id, '>', action.actionId);
        }
        const handler = this.actionHandlers[action.action.type];
        if (!handler) {
            throw new Error(`No action handler found for action of type ${action.action.type}\n${JSON.stringify(action, null, 2)}`);
        }
        handler.remove(action);
    }
    attachStack(action) {
        if (action.debug) {
            console.debug('Attach stack of action', action.program.id, '>', action.actionId);
        }
        const stack = action.stack;
        if (stack) {
            this.eventSystem.attachTriggers(stack.triggers);
        }
        this._listeningStackActions.set(action.id, action);
    }
    detachStack(action) {
        if (action.debug) {
            console.debug('Detach stack of action', action.program.id, '>', action.actionId);
        }
        const stack = action.stack;
        if (stack) {
            this.eventSystem.detachTriggers(stack.triggers);
        }
        this._listeningStackActions.delete(action.id);
    }
    attachTriggers(action) {
        if (action.debug) {
            console.debug('Attach triggers of action', action.program.id, '>', action.actionId);
        }
        this._listeningActions.set(action.id, action);
        if (action.triggers) {
            this.eventSystem.attachTriggers(action.triggers);
        }
    }
    detachTriggers(action) {
        if (action.debug) {
            console.debug('Detach triggers of action', action.program.id, '>', action.actionId);
        }
        this._listeningActions.delete(action.id);
        if (action.triggers) {
            this.eventSystem.detachTriggers(action.triggers);
        }
    }
}
exports.LogicEngine = LogicEngine;
//# sourceMappingURL=logic.engine.js.map