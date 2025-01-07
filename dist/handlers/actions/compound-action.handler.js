"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
const params_service_1 = require("../../services/params.service");
exports.CompoundActionHandler = new (class CompoundActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const debug = context.action.debug;
        const params = context.action.state.params
            ? params_service_1.ParamsService.resolve(context.action.state.params, context.action)
            : {};
        const innerContext = ts_logic_framework_1.DynamicContextService.createContext({
            engine: context.action.engine,
            program: context.action.program,
            initiator: context.action.initiator,
            source: context.action.source,
            debug,
        }, params);
        for (const subActionReference of context.action.state.compound) {
            const subActionId = ts_logic_framework_1.LogicService.resolve(subActionReference, context);
            if (!subActionId) {
                if (debug) {
                    console.error('Compound entry provided no action id:', subActionReference);
                }
                continue;
            }
            if (!(await context.action.engine.tryRun({
                ...innerContext,
                actionId: subActionId,
            }))) {
                if (debug) {
                    console.warn('Compound action', subActionId, 'failed.');
                }
            }
        }
        return true;
    }
})();
//# sourceMappingURL=compound-action.handler.js.map