import { ConditionActionDto, ConditionActionStateDto } from '../../dto/actions/condition.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { Computable } from 'ts-logic-framework';
export declare const ConditionActionHandler: {
    tryRun(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): Promise<boolean>;
    handleCase(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>, subActionReference: Computable<string>): Promise<boolean>;
    apply(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<ConditionActionDto, ConditionActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<ConditionActionDto, ConditionActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<ConditionActionDto, ConditionActionStateDto>): void;
};
//# sourceMappingURL=condition-action.handler.d.ts.map