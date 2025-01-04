"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
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
                return await this.handleCase(context, state.true);
            }
        }
        else {
            if (state.false) {
                return await this.handleCase(context, state.false);
            }
        }
        return true;
    }
    async handleCase(context, subActionReference) {
        const { action } = context;
        const { engine, program, action: template, debug } = action;
        const subActionId = ts_logic_framework_1.LogicService.resolve(subActionReference, context);
        if (!program) {
            console.error('Program missing in action', action);
            return false;
        }
        const subAction = program.actions[subActionId];
        if (!subAction) {
            if (debug) {
                console.error('Condition true action not found:', subActionId);
            }
            return false;
        }
        if (subAction) {
            return await engine.tryRun({
                ...context.action,
                actionId: subActionId,
                debug: debug || subAction.debug,
            });
        }
        if (debug) {
            console.debug('Condition has no true case', template.type);
        }
        return false;
    }
})();
//# sourceMappingURL=condition-action.handler.js.map