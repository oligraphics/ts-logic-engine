"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyActionHandler = void 0;
const action_handler_1 = require("./action.handler");
exports.DummyActionHandler = new (class DummyActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        if (context.action.debug) {
            console.debug('Running dummy action', context.action.template);
        }
        return true;
    }
})();
//# sourceMappingURL=dummy-action.handler.js.map