"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackCounterService = void 0;
const counter_method_service_1 = require("./counter-method.service");
const builtin_event_type_enum_1 = require("../enums/builtin-event-type.enum");
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
        stack.removed = true;
        const event = {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.STACK_REMOVE,
            stack,
        };
        await stack.action.engine.callEvent(stack.action.target, event, async () => {
            stack.action.engine.remove(stack.action);
        }, stack.action.debug);
    }
})();
//# sourceMappingURL=stack-counter.service.js.map