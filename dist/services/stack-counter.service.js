"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackCounterService = void 0;
const counter_method_service_1 = require("./counter-method.service");
const builtin_event_type_enum_1 = require("../enums/builtin-event-type.enum");
const ts_logic_framework_1 = require("ts-logic-framework");
const params_service_1 = require("./params.service");
exports.StackCounterService = new (class StackCounterService {
    async tryChange(context, method, amount) {
        const { trigger, action } = context;
        if (trigger.debug) {
            console.warn(`Try changing counter: ${method} ${amount}`);
        }
        const stack = action.stacks;
        const oldValue = stack.value;
        const newValue = counter_method_service_1.CounterMethodService.getChangedValue(oldValue, method, amount);
        const change = newValue - oldValue;
        const event = {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.STACK_CHANGE,
            action: context.action,
            stack,
            method,
            amount,
            oldValue,
            newValue,
            change,
            cancelable: true,
        };
        const success = await action.engine.callEvent(trigger.action.target, event, async (event) => {
            stack.value = counter_method_service_1.CounterMethodService.getChangedValue(stack.value, event.method, event.amount);
            return true;
        }, trigger.action.debug);
        if (success) {
            await this.changed(stack);
        }
        return success;
    }
    async changed(stack) {
        if (stack.value <= 0 && !stack.persistent) {
            await this.remove(stack);
        }
    }
    async remove(stack) {
        if (stack.removed) {
            console.error('Trying to remove an already removed stack');
            return;
        }
        if (stack.action.debug) {
            console.debug('Remove stack counter of action', stack.action.program.id, '>', stack.action.actionId);
        }
        stack.removed = true;
        const event = {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.STACK_REMOVE,
            stack,
        };
        await stack.action.engine.callEvent(stack.action.target, event, async () => {
            stack.action.engine.remove(stack.action);
        }, stack.action.debug);
        if (stack.after) {
            const next = ts_logic_framework_1.LogicService.resolve(stack.after.next, stack.action);
            if (!next) {
                if (stack.action.debug) {
                    console.error('Stack specified after hook but returned no action id', stack.after);
                }
                return;
            }
            const params = stack.after.params
                ? params_service_1.ParamsService.resolve(stack.after.params, stack.action, stack.action.debug)
                : {};
            await stack.action.engine.tryRun({
                engine: stack.action.engine,
                initiator: stack.action.initiator,
                source: stack.action.source,
                program: stack.action.program,
                actionId: next,
                params,
            });
        }
    }
})();
//# sourceMappingURL=stack-counter.service.js.map