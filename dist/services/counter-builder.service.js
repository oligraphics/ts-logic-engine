"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterBuilderService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const counter_trigger_builder_service_1 = require("./counter-trigger-builder.service");
exports.CounterBuilderService = new (class CounterBuilderService {
    build(configuration, triggerType, defaultMethod, defaultAmount, action) {
        const value = ts_logic_framework_1.LogicService.resolve(configuration.value, action);
        if (value === undefined || Number.isNaN(value)) {
            throw new Error('Counter value must be a valid number. ' +
                JSON.stringify(configuration));
        }
        return {
            action,
            triggers: configuration.triggers
                ? counter_trigger_builder_service_1.CounterTriggerBuilderService.buildAll(configuration.triggers, triggerType, defaultMethod, defaultAmount, action)
                : [],
            value,
            removed: false,
        };
    }
})();
//# sourceMappingURL=counter-builder.service.js.map