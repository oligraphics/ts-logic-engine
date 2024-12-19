export declare const BuiltinTriggerHandlers: {
    action: {
        handle(trigger: import("./trigger-instance.interface").ITriggerInstance, event: import("..").EventDto): Promise<void>;
    };
    counter: {
        handle(trigger: import("./counter-trigger-instance.interface").ICounterTriggerInstance, event: import("..").EventDto): Promise<void>;
    };
    stack: {
        handle(trigger: import("./counter-trigger-instance.interface").ICounterTriggerInstance, event: import("..").EventDto): Promise<void>;
    };
};
//# sourceMappingURL=builtin-trigger-handlers.interface.d.ts.map