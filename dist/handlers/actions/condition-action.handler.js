"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
const params_service_1 = require("../../services/params.service");
exports.ConditionActionHandler = new (class ConditionActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const { action } = context;
        const { state, actionId, debug } = action;
        const checkResult = ts_logic_framework_1.ConditionService.testCondition(state.condition, context);
        if (debug) {
            console.debug('Condition check result', action.program.id, '>', actionId, checkResult);
        }
        if (checkResult === true) {
            if (state.true) {
                if (debug) {
                    console.debug('Run true case');
                }
                return await this.handleCase(context, state.true);
            }
            else if (debug) {
                console.debug('Condition action provides no true case', state);
            }
        }
        else {
            if (state.false) {
                if (debug) {
                    console.debug('Run false case');
                }
                return await this.handleCase(context, state.false);
            }
            else if (debug) {
                console.debug('Condition action provides no false case', state);
            }
        }
        return true;
    }
    async handleCase(context, subActionReference) {
        const { action } = context;
        const { engine, program, debug } = action;
        const subActionId = ts_logic_framework_1.LogicService.resolve(subActionReference, context);
        if (!program) {
            console.error('Program missing in action', action);
            return false;
        }
        if (!subActionId) {
            if (debug) {
                console.error('Condition case invalid:', subActionReference);
            }
            return false;
        }
        const subAction = program.actions[subActionId];
        if (!subAction) {
            if (debug) {
                console.error('Condition case not found:', subActionId);
            }
            return false;
        }
        if (debug) {
            console.debug('Run', subActionId);
        }
        const params = action.state.params
            ? params_service_1.ParamsService.resolve(action.state.params, context.action)
            : {};
        return await engine.tryRun({
            ...ts_logic_framework_1.DynamicContextService.createContext({
                engine: context.action.engine,
                program: context.action.program,
                initiator: context.action.initiator,
                source: context.action.source,
                actionId: subActionId,
                debug: debug || subAction.debug,
            }, params),
        });
    }
})();
//# sourceMappingURL=condition-action.handler.js.map