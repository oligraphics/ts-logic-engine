"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTriggerHandler = void 0;
const trigger_handler_1 = require("./trigger.handler");
exports.CustomTriggerHandler = new (class CustomTriggerHandler extends trigger_handler_1.TriggerHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(trigger, event) {
        throw new Error('Not yet implemented');
    }
})();
//# sourceMappingURL=custom-trigger.handler.js.map