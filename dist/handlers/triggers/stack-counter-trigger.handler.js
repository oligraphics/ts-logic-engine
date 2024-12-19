"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackCounterTriggerHandler = void 0;
const trigger_handler_1 = require("./trigger.handler");
const stack_counter_service_1 = require("../../services/stack-counter.service");
exports.StackCounterTriggerHandler = new (class StackCounterTriggerHandler extends trigger_handler_1.TriggerHandler {
    async handle(trigger, event) {
        await stack_counter_service_1.StackCounterService.tryChange({
            trigger,
            event,
            action: trigger.action,
        }, trigger.method, trigger.amount);
    }
})();
//# sourceMappingURL=stack-counter-trigger.handler.js.map