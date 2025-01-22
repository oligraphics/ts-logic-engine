"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageActionHandler = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const action_handler_1 = require("./action.handler");
const builtin_event_type_enum_1 = require("../../enums/builtin-event-type.enum");
exports.MessageActionHandler = new (class MessageActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const { action } = context;
        const { state, debug } = action;
        const innerContext = {
            ...context,
            ...action,
        };
        const message = ts_logic_framework_1.LogicService.resolve(state.message, innerContext, debug);
        if (!message) {
            if (debug) {
                console.error('Action generated no message', state);
            }
            return false;
        }
        const variables = {};
        if (state.variables) {
            for (const [key, valueBuilder] of Object.entries(state.variables)) {
                variables[key] =
                    ts_logic_framework_1.LogicService.resolve(valueBuilder, innerContext, debug) ?? '';
            }
        }
        const data = {};
        if (state.data) {
            for (const [key, valueBuilder] of Object.entries(state.data)) {
                data[key] = ts_logic_framework_1.LogicService.resolve(valueBuilder, innerContext, debug);
            }
        }
        return await action.engine.callEvent(action, {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.MESSAGE,
            message,
            variables,
            data,
        }, async (event) => {
            if (debug) {
                console.log('DEBUG Message:', event.message);
            }
            return true;
        }, debug);
    }
})();
//# sourceMappingURL=message-action.handler.js.map