export declare enum BuiltinActionTypeEnum {
    /**
     * Run multiple actions in sequence
     */
    COMPOUND = "compound",
    /**
     * Run one of two actions based on a condition
     */
    CONDITION = "condition",
    /**
     * Empty action without any own behaviour
     */
    DUMMY = "dummy",
    /**
     * Action which can react to and modify events
     */
    INTERCEPT = "intercept",
    /**
     * Action which sends a message event
     */
    MESSAGE = "message",
    /**
     * Run a different program
     */
    PROGRAM = "program",
    /**
     * Action which can repeat other actions after they are performed
     */
    REPEAT = "repeat",
    /**
     * Action which performs other actions based on the flow of time
     */
    SCHEDULE = "schedule"
}
//# sourceMappingURL=builtin-action-type.enum.d.ts.map