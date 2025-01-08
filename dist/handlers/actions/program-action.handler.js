"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramActionHandler = void 0;
const action_handler_1 = require("./action.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
const params_service_1 = require("../../services/params.service");
exports.ProgramActionHandler = new (class ProgramActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const { action } = context;
        const { state, debug } = action;
        if (debug) {
            console.debug('Run program action', action.action);
        }
        const programId = ts_logic_framework_1.LogicService.resolve(state.program, context, debug);
        if (!programId) {
            if (debug) {
                console.error('Program action returned no program id:', action.action);
            }
            return false;
        }
        const program = action.engine.programs.find((p) => p.id === programId);
        if (!program) {
            if (debug) {
                console.error('Program action references unknown program:', programId, 'action:', action.action);
            }
            return false;
        }
        const actionId = ts_logic_framework_1.LogicService.resolve(state.action, context, debug) ?? 'main';
        const params = state.params
            ? params_service_1.ParamsService.resolve(state.params, context, debug)
            : undefined;
        if (debug) {
            console.debug('Run program from action', program.id, '>', actionId, 'params:', params);
        }
        return await action.engine.tryRun({
            engine: action.engine,
            initiator: action.initiator,
            source: action.target?.id
                ? action.target
                : action.source,
            program,
            actionId,
            params,
        });
    }
})();
//# sourceMappingURL=program-action.handler.js.map