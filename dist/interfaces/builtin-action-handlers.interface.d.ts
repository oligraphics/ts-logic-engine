export declare const BuiltinActionHandlers: {
    compound: {
        tryRun(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>, callNext: boolean): boolean;
        remove(context: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").CompoundActionDto, import("../dto/states/compound-action.state.dto").CompoundActionStateDto>): void;
    };
    condition: {
        tryRun(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>): boolean;
        handleCase(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>, subActionReference: import("ts-logic-framework").DynamicValue): boolean;
        apply(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>, callNext: boolean): boolean;
        remove(context: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").ConditionActionDto, import("../dto/states/condition-action.state.dto").ConditionActionStateDto>): void;
    };
    dummy: {
        tryRun(context: import("..").TriggerContextDto<import("..").DummyActionDto, import("../dto/states/dummy-action.state.dto").DummyActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").DummyActionDto, object>, callNext: boolean): boolean;
        remove(context: import("..").ActionInstanceDto<import("..").DummyActionDto, object>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").DummyActionDto, object>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").DummyActionDto, object>): void;
    };
    message: {
        tryRun(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>): boolean;
        apply(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>): boolean;
        trigger(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>): boolean;
        perform(context: import("..").TriggerContextDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>, callNext: boolean): boolean;
        remove(context: import("..").ActionInstanceDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>): void;
        onEvent(action: import("..").ActionInstanceDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
        setAttached(effect: import("..").StatusStateDto, triggerContext: import("..").TriggerContextDto<import("..").MessageActionDto, import("../dto/states/message-action.state.dto").MessageActionStateDto>): void;
    };
};
//# sourceMappingURL=builtin-action-handlers.interface.d.ts.map