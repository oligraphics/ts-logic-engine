"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterMethodService = void 0;
const counter_method_enum_1 = require("../enums/counter-method.enum");
exports.CounterMethodService = new (class CounterMethodService {
    getChangedValue(value, method, amount) {
        switch (method) {
            case counter_method_enum_1.CounterMethodEnum.INCREASE:
                return value + amount;
            case counter_method_enum_1.CounterMethodEnum.REDUCE:
                return value - amount;
            case counter_method_enum_1.CounterMethodEnum.SET:
                return amount;
            case counter_method_enum_1.CounterMethodEnum.REMOVE:
                return 0;
        }
    }
})();
//# sourceMappingURL=counter-method.service.js.map