"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinEventTypeEnum = void 0;
var BuiltinEventTypeEnum;
(function (BuiltinEventTypeEnum) {
    /**
     * Fired whenever the engine runs an action as part of a program
     */
    BuiltinEventTypeEnum["ACTION"] = "action";
    /**
     * Fired by message actions
     */
    BuiltinEventTypeEnum["MESSAGE"] = "message";
    /**
     * Fired when the engine runs a program
     */
    BuiltinEventTypeEnum["PROGRAM"] = "program";
    /**
     * Fired by repeat actions when they trigger a repeat of another action
     */
    BuiltinEventTypeEnum["REPEAT_ACTION"] = "repeat_action";
    /**
     * Fired whenever a stack counter changes
     */
    BuiltinEventTypeEnum["STACK_CHANGE"] = "stack_change";
    /**
     * Fired when a stack is being removed
     */
    BuiltinEventTypeEnum["STACK_REMOVE"] = "stack_remove";
    /**
     * TODO Fired when targets are being selected (not yet implemented)
     */
    BuiltinEventTypeEnum["TARGET_SELECTION"] = "target_selection";
    /**
     * TODO Fired after targets have been selected (not yet implemented)
     */
    BuiltinEventTypeEnum["TARGET_SELECTED"] = "target_selected";
    /**
     * Fired whenever an action is being triggered, only usable as the event
     * reference within stack counters
     */
    BuiltinEventTypeEnum["TRIGGER"] = "trigger";
})(BuiltinEventTypeEnum || (exports.BuiltinEventTypeEnum = BuiltinEventTypeEnum = {}));
//# sourceMappingURL=builtin-event-type.enum.js.map