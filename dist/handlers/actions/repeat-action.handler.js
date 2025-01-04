"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatActionHandler = void 0;
const action_handler_1 = require("./action.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
const builtin_event_type_enum_1 = require("../../enums/builtin-event-type.enum");
exports.RepeatActionHandler = new (class RepeatActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const repeat = ts_logic_framework_1.LogicService.resolve(context.action.state.repeat, context);
        if (context.action.debug) {
            console.warn(`Repeat action repeats ${repeat} times`);
        }
        if (repeat <= 0) {
            return true;
        }
        const repeatAction = ts_logic_framework_1.LogicService.resolve(context.action.state.action, context);
        if (!repeatAction) {
            console.warn(`Repeat action produced no action to repeat`);
            return false;
        }
        const event = {
            type: builtin_event_type_enum_1.BuiltinEventTypeEnum.REPEAT_ACTION,
            action: context.action,
            repeat,
            repeatAction,
            params: context.action.state.params ?? {},
            cancelable: true,
        };
        return await context.action.engine.callEvent(context.action.source, event, async (event) => {
            for (let i = 0; i < event.repeat; i++) {
                const params = Object.fromEntries(Object.entries(event.params).map(([key, value]) => [
                    key,
                    ts_logic_framework_1.LogicService.resolve(value, {
                        ...context,
                        ...ts_logic_framework_1.DynamicContextService.createContext({
                            iteration: i,
                        }),
                    }),
                ]));
                await context.action.engine.tryRun({
                    engine: context.action.engine,
                    program: context.action.program,
                    initiator: context.action.source,
                    source: context.action.source,
                    actionId: repeatAction,
                    ...ts_logic_framework_1.DynamicContextService.createContext({ iteration: i }, params),
                });
            }
            return true;
        }, context.action.debug);
    }
})();
//# sourceMappingURL=repeat-action.handler.js.map