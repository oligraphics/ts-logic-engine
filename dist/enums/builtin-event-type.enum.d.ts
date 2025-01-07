export declare enum BuiltinEventTypeEnum {
    /**
     * Fired whenever the engine runs an action as part of a program
     */
    ACTION = "action",
    /**
     * Fired by message actions
     */
    MESSAGE = "message",
    /**
     * Fired when the engine runs a program
     */
    PROGRAM = "program",
    /**
     * Fired by repeat actions when they trigger a repeat of another action
     */
    REPEAT_ACTION = "repeat_action",
    /**
     * Fired whenever a stack counter changes
     */
    STACK_CHANGE = "stack_change",
    /**
     * Fired when a stack is being removed
     */
    STACK_REMOVE = "stack_remove",
    /**
     * TODO Fired when targets are being selected (not yet implemented)
     */
    TARGET_SELECTION = "target_selection",
    /**
     * TODO Fired after targets have been selected (not yet implemented)
     */
    TARGET_SELECTED = "target_selected",
    /**
     * Fired whenever an action is being triggered, only usable as the event
     * reference within stack counters
     */
    TRIGGER = "trigger"
}
//# sourceMappingURL=builtin-event-type.enum.d.ts.map