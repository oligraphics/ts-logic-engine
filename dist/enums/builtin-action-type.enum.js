"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinActionTypeEnum = void 0;
var BuiltinActionTypeEnum;
(function (BuiltinActionTypeEnum) {
    /**
     * Run multiple actions in sequence
     */
    BuiltinActionTypeEnum["COMPOUND"] = "compound";
    /**
     * Run one of two actions based on a condition
     */
    BuiltinActionTypeEnum["CONDITION"] = "condition";
    /**
     * Empty action without any own behaviour
     */
    BuiltinActionTypeEnum["DUMMY"] = "dummy";
    /**
     * Action which can react to and modify events
     */
    BuiltinActionTypeEnum["INTERCEPT"] = "intercept";
    /**
     * Action which sends a message event
     */
    BuiltinActionTypeEnum["MESSAGE"] = "message";
    /**
     * Run a different program
     */
    BuiltinActionTypeEnum["PROGRAM"] = "program";
    /**
     * Action which can repeat other actions after they are performed
     */
    BuiltinActionTypeEnum["REPEAT"] = "repeat";
})(BuiltinActionTypeEnum || (exports.BuiltinActionTypeEnum = BuiltinActionTypeEnum = {}));
//# sourceMappingURL=builtin-action-type.enum.js.map