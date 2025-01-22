"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatActionHandler = void 0;
const action_handler_1 = require("./action.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
const builtin_event_type_enum_1 = require("../../enums/builtin-event-type.enum");
const params_service_1 = require("../../services/params.service");
exports.RepeatActionHandler = new (class RepeatActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const { action } = context;
        const { state, debug } = action;
        const innerContext = {
            ...context,
            ...action,
        };
        const repeat = ts_logic_framework_1.LogicService.resolve(state.repeat, innerContext) ?? 0;
        if (debug) {
            console.warn(`Repeat action repeats ${repeat} times`);
        }
        if (repeat <= 0) {
            return true;
        }
        const repeatAction = ts_logic_framework_1.LogicService.resolve(state.action, innerContext);
        if (!repeatAction) {
            console.warn(`Repeat action produced no action to repeat`);
            return false;
        }
        const event = {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.REPEAT_ACTION,
            repeat,
            repeatAction,
            params: state.params ?? {},
            cancelable: true,
        };
        return await action.engine.callEvent(action, event, async (event) => {
            for (let i = 0; i < event.repeat; i++) {
                const params = params_service_1.ParamsService.resolve(event.params, {
                    ...innerContext,
                    ...ts_logic_framework_1.DynamicContextService.createContext({
                        iteration: i,
                    }),
                }, debug);
                await action.engine.tryRun({
                    engine: action.engine,
                    program: action.program,
                    initiator: action.source,
                    source: action.target?.id !== undefined
                        ? action.target
                        : action.source,
                    actionId: repeatAction,
                    params,
                });
            }
            return true;
        }, context.action.debug);
    }
})();
//# sourceMappingURL=repeat-action.handler.js.map