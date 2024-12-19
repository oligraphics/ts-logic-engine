export declare const BuiltinActionHandlers: {
    compound: {
        tryRun(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): void;
    };
    condition: {
        tryRun(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): boolean;
        handleCase(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, subActionReference: import("ts-logic-framework").DynamicValue): boolean;
        apply(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): void;
    };
    dummy: {
        tryRun(context: import("..").TriggerContextDto<import("..").DummyActionDto, import("..").DummyActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").DummyActionDto, object>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").DummyActionDto, object>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").DummyActionDto, object>): void;
    };
    intercept: {
        tryRun(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): void;
    };
    message: {
        tryRun(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").MessageActionDto, import("..").MessageActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): void;
    };
    repeat: {
        tryRun(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>, callNext: boolean): boolean;
        remove(action: import("..").ActionInstanceDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): void;
    };
};
//# sourceMappingURL=builtin-action-handlers.interface.d.ts.map