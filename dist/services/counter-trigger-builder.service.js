"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterTriggerBuilderService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const ts_logic_framework_2 = require("ts-logic-framework");
exports.CounterTriggerBuilderService = new (class CounterTriggerBuilderService {
    buildAll(configurations, triggerType, defaultMethod, defaultAmount, action) {
        return configurations.map((c) => this.build(c, triggerType, defaultMethod, defaultAmount, action));
    }
    build(configuration, triggerType, defaultMethod, defaultAmount, action) {
        const method = (configuration.method
            ? ts_logic_framework_2.LogicService.resolve(configuration.method, action, configuration.debug)
            : undefined) ?? defaultMethod;
        const amount = (configuration.amount
            ? ts_logic_framework_2.LogicService.resolve(configuration.amount, action, configuration.debug)
            : undefined) ?? defaultAmount;
        return {
            id: ts_logic_framework_1.IdService.createRandomId(),
            type: triggerType,
            action,
            ...configuration,
            method,
            amount,
        };
    }
})();
//# sourceMappingURL=counter-trigger-builder.service.js.map