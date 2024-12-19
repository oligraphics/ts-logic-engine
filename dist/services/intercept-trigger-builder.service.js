"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptTriggerBuilderService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const builtin_trigger_type_enum_1 = require("../enums/builtin-trigger-type.enum");
exports.InterceptTriggerBuilderService = new (class InterceptTriggerBuilderService {
    buildAll(configurations, action) {
        return configurations.map((c) => this.build(c, action));
    }
    build(configuration, action) {
        return {
            id: ts_logic_framework_1.IdService.createRandomId(),
            type: builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.ACTION,
            ...configuration,
            action,
        };
    }
})();
//# sourceMappingURL=intercept-trigger-builder.service.js.map