"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptActionHandler = void 0;
const action_handler_1 = require("./action.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
exports.InterceptActionHandler = new (class InterceptActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const debug = context.action.debug;
        const trigger = context.trigger;
        const reactionId = trigger && trigger.reaction
            ? ts_logic_framework_1.LogicService.resolve(trigger.reaction, context, debug)
            : undefined;
        if (!reactionId) {
            if (debug) {
                console.warn('Intercept trigger has no reaction property.', trigger);
            }
            return true;
        }
        const reactions = context.action.state.actions ?? {};
        const reaction = reactions[reactionId];
        if (!reaction) {
            if (debug || trigger.debug) {
                console.warn('Intercept reaction', reactionId, 'not found. Available:', Object.keys(reactions));
            }
            return true;
        }
        if (reaction.change) {
            if (debug) {
                console.debug('Apply changes to event', reaction.change);
            }
            const event = context.event;
            for (const [property, value] of Object.entries(reaction.change)) {
                const previousValue = event[property];
                const modifiedValue = ts_logic_framework_1.LogicService.resolve(value, {
                    ...context,
                    ...ts_logic_framework_1.DynamicContextService.createContext({
                        value: previousValue,
                    }),
                });
                event[property] = modifiedValue;
                if (debug) {
                    console.debug('Change', previousValue, 'to', modifiedValue);
                }
            }
        }
        if (reaction.action) {
            const action = ts_logic_framework_1.LogicService.resolve(reaction.action, context, debug);
            if (debug) {
                console.debug('Call action ', action, ' in response to the intercepted event', reaction.change);
            }
            if (!action || !context.action.program.actions[action]) {
                if (debug) {
                    console.error('Action', action, 'not found in program', context.action.program.id);
                }
                return true;
            }
            const params = reaction.params
                ? Object.fromEntries(Object.entries(reaction.params).map(([key, value]) => [
                    key,
                    ts_logic_framework_1.LogicService.resolve(value, context, debug),
                ]))
                : {};
            await context.action.engine.tryRun({
                params,
                ...ts_logic_framework_1.DynamicContextService.createContext({
                    engine: context.action.engine,
                    program: context.action.program,
                    initiator: context.action.source,
                    source: context.action.source,
                    actionId: action,
                }),
            });
        }
        return true;
    }
})();
//# sourceMappingURL=intercept-action.handler.js.map