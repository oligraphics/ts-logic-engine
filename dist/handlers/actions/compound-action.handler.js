"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
exports.CompoundActionHandler = new (class CompoundActionHandler extends action_handler_1.ActionHandler {
    tryRun(context) {
        for (const subActionReference of context.action.state.compound) {
            const subActionId = ts_logic_framework_1.LogicService.resolve(subActionReference, context);
            if (!context.action.engine.tryRun({
                ...context.action,
                actionId: subActionId,
                debug: context.action.debug,
            })) {
                if (context.action.debug) {
                    console.warn('Compound action', subActionId, 'failed.');
                }
            }
        }
        return true;
    }
})();
//# sourceMappingURL=compound-action.handler.js.map