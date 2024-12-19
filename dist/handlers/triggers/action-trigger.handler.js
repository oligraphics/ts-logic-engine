"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTriggerHandler = void 0;
const trigger_handler_1 = require("./trigger.handler");
exports.ActionTriggerHandler = new (class ActionTriggerHandler extends trigger_handler_1.TriggerHandler {
    handle(trigger, event) {
        const handler = trigger.action.engine.getActionHandler(trigger.action.action.type);
        if (!handler) {
            throw new Error(`No action handler found for action of type ${trigger.action.action.type}\n${JSON.stringify(trigger.action.action, null, 2)}`);
        }
        handler.trigger({
            trigger,
            event,
            action: trigger.action,
        });
    }
})();
//# sourceMappingURL=action-trigger.handler.js.map