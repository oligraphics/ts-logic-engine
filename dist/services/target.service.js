"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
exports.TargetService = new (class TargetService {
    resolveTargets(value, context, debug) {
        const result = ts_logic_framework_1.LogicService.resolve(value, context, debug);
        if (Array.isArray(result)) {
            return result
                .filter((t) => t?.allowTargeting !== false)
                .map((t) => t);
        }
        return result?.allowTargeting !== false
            ? [result]
            : [];
    }
})();
//# sourceMappingURL=target.service.js.map