"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTriggerBuilderService = void 0;
const id_service_1 = require("./id.service");
exports.ActionTriggerBuilderService = new (class TriggerBuilderService {
    buildAll(configurations, action) {
        return configurations.map((c) => this.build(c, action));
    }
    build(configuration, action) {
        return {
            id: id_service_1.IdService.createRandomId(),
            ...configuration,
            action,
        };
    }
})();
//# sourceMappingURL=action-trigger-builder.service.js.map