"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTriggerHandler = void 0;
const trigger_handler_1 = require("./trigger.handler");
exports.CustomTriggerHandler = new (class CustomTriggerHandler extends trigger_handler_1.TriggerHandler {
    async handle(trigger, event) {
        const callback = trigger.trigger;
        if (callback) {
            await callback(event);
        }
    }
})();
//# sourceMappingURL=custom-trigger.handler.js.map