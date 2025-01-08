"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsService = void 0;
const ts_logic_framework_1 = require("ts-logic-framework");
exports.ParamsService = new (class ParamsService {
    resolve(params, context, debug) {
        return Object.fromEntries(Object.entries(params).map(([key, value]) => [
            key,
            ts_logic_framework_1.LogicService.resolve(value, context, debug),
        ]));
    }
})();
//# sourceMappingURL=params.service.js.map