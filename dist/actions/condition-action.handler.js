"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
exports.ConditionActionHandler = new (class ConditionActionHandler extends action_handler_1.ActionHandler {
    tryRun(context) {
        const { action } = context;
        const { state, template, debug } = action;
        const checkResult = ts_logic_framework_1.ConditionService.testCondition(state.condition, context);
        if (debug) {
            console.debug('Condition check result', template.type, checkResult);
        }
        if (checkResult === true) {
            if (state.true) {
                return this.handleCase(context, state.true);
            }
        }
        else {
            if (state.false) {
                return this.handleCase(context, state.false);
            }
        }
        return true;
    }
    handleCase(context, subActionReference) {
        const { action } = context;
        const { engine, program, template, debug } = action;
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
            return engine.tryRun({
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