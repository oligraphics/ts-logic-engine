export declare const BuiltinActionHandlers: {
    compound: {
        tryRun(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").CompoundActionDto, import("..").CompoundActionStateDto>): void;
    };
    condition: {
        tryRun(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): Promise<boolean>;
        handleCase(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, subActionReference: import("ts-logic-framework").Computable<string>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").ConditionActionDto, import("..").ConditionActionStateDto>): void;
    };
    dummy: {
        tryRun(context: import("..").TriggerContextDto<import("..").DummyActionDto, import("..").DummyActionStateDto>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").DummyActionDto, object>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").DummyActionDto, object>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").DummyActionDto, object>): void;
    };
    intercept: {
        tryRun(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").InterceptActionDto, import("..").InterceptActionStateDto>): void;
    };
    message: {
        tryRun(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").MessageActionDto, import("..").MessageActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").MessageActionDto, import("..").MessageActionStateDto>): void;
    };
    repeat: {
        tryRun(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): Promise<boolean>;
        apply(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): Promise<boolean>;
        trigger(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): Promise<boolean>;
        perform(context: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>, callNext: boolean): Promise<boolean>;
        remove(action: import("..").ActionInstanceDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): Promise<void>;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").RepeatActionDto, import("..").RepeatActionStateDto>): void;
    };
};
//# sourceMappingURL=builtin-action-handlers.interface.d.ts.map