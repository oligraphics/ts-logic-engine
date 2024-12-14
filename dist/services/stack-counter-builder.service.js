"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackCounterBuilderService = void 0;
const counter_builder_service_1 = require("./counter-builder.service");
const counter_method_enum_1 = require("../enums/counter-method.enum");
exports.StackCounterBuilderService = new (class StackCounterBuilderService {
    build(configuration, action) {
        const counter = counter_builder_service_1.CounterBuilderService.build(configuration, counter_method_enum_1.CounterMethodEnum.REDUCE, 1, action);
        return {
            ...counter,
        };
    }
})();
//# sourceMappingURL=stack-counter-builder.service.js.map