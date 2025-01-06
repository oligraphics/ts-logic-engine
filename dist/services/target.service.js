"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
const group_target_model_1 = require("../models/group-target.model");
exports.TargetService = new (class TargetService {
    resolveTargets(action, context, debug) {
        const value = action.targets ?? action.target;
        if (value === undefined) {
            return undefined;
        }
        const result = ts_logic_framework_1.LogicService.resolve(value, context, debug);
        let validTargets;
        if (Array.isArray(result)) {
            validTargets = result
                .filter((t) => t?.allowTargeting !== false)
                .map((t) => t);
        }
        else {
            validTargets =
                result?.allowTargeting !== false
                    ? [result]
                    : [];
        }
        return action.targets ? validTargets : [new group_target_model_1.GroupTarget(validTargets)];
    }
})();
//# sourceMappingURL=target.service.js.map