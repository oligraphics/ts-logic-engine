"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterMethodEnum = void 0;
var CounterMethodEnum;
(function (CounterMethodEnum) {
    /**
     * Sets the amount<br />
     * <code>x = value</code>
     */
    CounterMethodEnum["SET"] = "set";
    /**
     * Adds an amount<br />
     * <code>x = x + value</code>
     */
    CounterMethodEnum["INCREASE"] = "increase";
    /**
     * Deducts an amount<br />
     * <code>x = x - value</code>
     */
    CounterMethodEnum["REDUCE"] = "reduce";
    /**
     * Removes the counter<br />
     * <code>x = 0</code>
     *
     */
    CounterMethodEnum["REMOVE"] = "remove";
})(CounterMethodEnum || (exports.CounterMethodEnum = CounterMethodEnum = {}));
//# sourceMappingURL=counter-method.enum.js.map