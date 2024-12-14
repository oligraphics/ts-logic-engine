import { ConditionActionDto } from '../dto/actions/condition.action.dto';
import { ConditionActionStateDto } from '../dto/states/condition-action.state.dto';
import { TriggerContextDto } from '../dto/contexts/trigger.context.dto';
import { DynamicValue } from 'ts-logic-framework';
export declare const ConditionActionHandler: {
    tryRun(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): boolean;
    handleCase(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>, subActionReference: DynamicValue): boolean;
    apply(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): boolean;
    trigger(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): boolean;
    perform(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>, callNext: boolean): boolean;
    remove(context: import("..").ActionInstanceDto<ConditionActionDto, ConditionActionStateDto>): void;
    onEvent(action: import("..").ActionInstanceDto<ConditionActionDto, ConditionActionStateDto>, event: import("..").EventDto, phase: import("..").EventPhaseEnum): void;
    setAttached(effect: import("..").StatusStateDto, triggerContext: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): void;
};
//# sourceMappingURL=condition-action.handler.d.ts.map