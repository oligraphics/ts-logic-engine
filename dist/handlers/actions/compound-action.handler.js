"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
exports.CompoundActionHandler = new (class CompoundActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const debug = context.action.debug;
        for (const subActionReference of context.action.state.compound) {
            const subActionId = ts_logic_framework_1.LogicService.resolve(subActionReference, context);
            if (!subActionId) {
                if (debug) {
                    console.error('Compound entry provided no action id:', subActionReference);
                }
                continue;
            }
            if (!(await context.action.engine.tryRun({
                ...context.action,
                actionId: subActionId,
                debug: context.action.debug,
            }))) {
                if (context.action.debug) {
                    console.warn('Compound action', subActionId, 'failed.');
                }
            }
        }
        return true;
    }
})();
//# sourceMappingURL=compound-action.handler.js.map