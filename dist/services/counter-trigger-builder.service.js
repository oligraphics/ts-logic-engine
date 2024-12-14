"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterTriggerBuilderService = void 0;
const id_service_1 = require("./id.service");
const ts_logic_framework_1 = require("ts-logic-framework");
exports.CounterTriggerBuilderService = new (class CounterTriggerBuilderService {
    buildAll(configurations, defaultMethod, defaultAmount, action) {
        return configurations.map((c) => this.build(c, defaultMethod, defaultAmount, action));
    }
    build(configuration, defaultMethod, defaultAmount, action) {
        const type = (configuration.method
            ? ts_logic_framework_1.LogicService.resolve(configuration.method, action, configuration.debug)
            : undefined) ?? defaultMethod;
        const amount = (configuration.amount
            ? ts_logic_framework_1.LogicService.resolve(configuration.amount, action, configuration.debug)
            : undefined) ?? defaultAmount;
        return {
            id: id_service_1.IdService.createRandomId(),
            action,
            ...configuration,
            type,
            amount,
        };
    }
})();
//# sourceMappingURL=counter-trigger-builder.service.js.map