"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptTriggerBuilderService = void 0;
const id_service_1 = require("./id.service");
exports.InterceptTriggerBuilderService = new (class InterceptTriggerBuilderService {
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
//# sourceMappingURL=intercept-trigger-builder.service.js.map