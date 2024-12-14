"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterBuilderService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const counter_trigger_builder_service_1 = require("./counter-trigger-builder.service");
exports.CounterBuilderService = new (class CounterBuilderService {
    build(configuration, defaultMethod, defaultAmount, action) {
        return {
            action,
            counter: ts_logic_framework_1.LogicService.resolve(configuration.counter, action),
            triggers: configuration.triggers
                ? counter_trigger_builder_service_1.CounterTriggerBuilderService.buildAll(configuration.triggers, defaultMethod, defaultAmount, action)
                : [],
        };
    }
})();
//# sourceMappingURL=counter-builder.service.js.map