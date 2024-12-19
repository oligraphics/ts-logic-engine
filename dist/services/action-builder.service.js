"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBuilderService = void 0;
const action_trigger_builder_service_1 = require("./action-trigger-builder.service");
const stack_counter_builder_service_1 = require("./stack-counter-builder.service");
const ts_logic_framework_1 = require("ts-logic-framework");
exports.ActionBuilderService = new (class ActionBuilderService {
    build(context) {
        const id = ts_logic_framework_1.IdService.createRandomId();
        const { action } = context;
        const result = {
            id,
            engine: context.engine,
            program: context.program,
            initiator: context.initiator,
            source: context.source,
            target: context.target,
            action: context.action,
            actionId: context.actionId,
            state: { ...action.apply },
            triggers: undefined,
            stacks: undefined,
            statusEffect: undefined,
            debug: action.debug || context.program.debug,
        };
        if (action.triggers) {
            result.triggers = action_trigger_builder_service_1.ActionTriggerBuilderService.buildAll(action.triggers, result);
        }
        if (action.stacks) {
            result.stacks = stack_counter_builder_service_1.StackCounterBuilderService.build(action.stacks, result);
        }
        return result;
    }
})();
//# sourceMappingURL=action-builder.service.js.map