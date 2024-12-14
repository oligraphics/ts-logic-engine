export declare enum EventPhaseEnum {
    /**
     * Called before to check whether the event may proceed
     */
    ALLOW = "allow",
    /**
     * Called before the event prepares execution
     */
    PREPARE = "prepare",
    /**
     * Called just before the event is actually fired
     */
    PERFORM = "perform",
    /**
     * Called just after the event fired
     */
    PERFORMED = "performed",
    /**
     * Called if the event is canceled at any stage before performed
     */
    CANCELED = "canceled",
    /**
     * Called at the very end for both performed and canceled scenarios
     */
    AFTER = "after"
}
//# sourceMappingURL=event-phase.enum.d.ts.map