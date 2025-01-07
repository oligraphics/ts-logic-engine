"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHandler = void 0;
const builtin_event_type_enum_1 = require("../../enums/builtin-event-type.enum");
const stack_counter_trigger_handler_1 = require("../triggers/stack-counter-trigger.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
const params_service_1 = require("../../services/params.service");
class ActionHandler {
    async apply(context) {
        if (context.action.action.attachable) {
            const statusHolder = context.action.target;
            if (statusHolder) {
                const effect = statusHolder.tryAddStatus(context.action, context);
                if (!effect) {
                    this.remove(context.action);
                }
            }
        }
        if (context.action.stacks) {
            context.action.engine.attachStack(context.action);
        }
        if ((context.action.triggers?.length ?? 0) > 0) {
            context.action.engine.attachTriggers(context.action);
            return true;
        }
        else {
            return this.trigger(context);
        }
    }
    async trigger(context) {
        if (context.event === undefined ||
            context.action.statusEffect === undefined) {
            return this.perform(context, true);
        }
        throw new Error('Not yet implemented.');
    }
    async perform(context, callNext) {
        if (!(await this.tryRun(context))) {
            if (context.action.debug) {
                console.debug('Action', context.action.action.type, 'failed to run');
            }
            return false;
        }
        if (context.action.stacks) {
            const event = {
                type: builtin_event_type_enum_1.BuiltinEventTypeEnum.TRIGGER,
            };
            for (const trigger of context.action.stacks.triggers.filter((t) => t.event === builtin_event_type_enum_1.BuiltinEventTypeEnum.TRIGGER)) {
                await stack_counter_trigger_handler_1.StackCounterTriggerHandler.handle(trigger, event);
            }
        }
        if (callNext && context.action.action.next) {
            const next = ts_logic_framework_1.LogicService.resolve(context.action.action.next, context);
            if (next) {
                const params = context.action.action.out
                    ? params_service_1.ParamsService.resolve(context.action.action.out, context)
                    : undefined;
                await context.action.engine.tryRun({
                    ...ts_logic_framework_1.DynamicContextService.createContext({
                        engine: context.action.engine,
                        program: context.action.program,
                        initiator: context.action.source,
                        source: context.action.source,
                        actionId: next,
                    }),
                    params,
                });
            }
            else if (context.action.debug) {
                console.warn('Follow-up action reference is empty for action', context.action.actionId, 'in program', context.action.program.id);
            }
        }
        return true;
    }
    remove(action) {
        action.engine.detachStack(action);
        action.engine.detachTriggers(action);
    }
    async onEvent(action, event, phase) {
        throw new Error('onEvent() not implemented for handler ' + this.constructor.name);
    }
    setAttached(effect, triggerContext) {
        throw new Error('setAttached() not implemented for handler ' + this.constructor.name);
    }
}
exports.ActionHandler = ActionHandler;
//# sourceMappingURL=action.handler.js.map