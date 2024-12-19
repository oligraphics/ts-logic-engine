"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTriggerBuilderService = void 0;
const id_service_1 = require("./id.service");
const builtin_trigger_type_enum_1 = require("../enums/builtin-trigger-type.enum");
exports.ActionTriggerBuilderService = new (class TriggerBuilderService {
    buildAll(configurations, action) {
        return configurations.map((c) => this.build(c, action));
    }
    build(configuration, action) {
        return {
            id: id_service_1.IdService.createRandomId(),
            type: builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.ACTION,
            ...configuration,
            action,
        };
    }
})();
//# sourceMappingURL=action-trigger-builder.service.js.map