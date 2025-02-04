import { ScheduleActionDto, ScheduleActionStateDto } from '../../dto/actions/schedule.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { DynamicContext } from 'ts-logic-framework';
import { ScheduleInstanceDto } from '../../dto/instances/schedule.instance.dto';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { ICustomTriggerInstance } from '../../interfaces/custom-trigger-instance.interface';
import { AfterBlockConfigurationDto } from '../../dto/configurations/after-block.configuration.dto';
export declare const ScheduleActionHandler: {
    tryRun(context: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>): Promise<boolean>;
    createUpdateHandler(action: IActionInstance, schedule: ScheduleInstanceDto[], cancelTriggers: ICustomTriggerInstance[], context: DynamicContext, debug?: boolean): (deltaTime: number) => Promise<void>;
    createCancelHandler(action: IActionInstance, updateHandler: (deltaTime: number) => Promise<void>, cancelTriggers: ICustomTriggerInstance[], cancelled: AfterBlockConfigurationDto | undefined, context: DynamicContext, debug?: boolean): () => Promise<void>;
    runScheduledAction(action: IActionInstance, instance: ScheduleInstanceDto, context: DynamicContext, debug?: boolean): Promise<void>;
    apply(context: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>): Promise<boolean>;
    trigger(context: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>): Promise<boolean>;
    perform(context: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>, callNext: boolean): Promise<boolean>;
    remove(action: import("../..").ActionInstanceDto<ScheduleActionDto, ScheduleActionStateDto>): void;
    onEvent(action: import("../..").ActionInstanceDto<ScheduleActionDto, ScheduleActionStateDto>, event: import("../..").EventDto, phase: import("../..").EventPhaseEnum): Promise<void>;
    setAttached(effect: import("../..").StatusStateDto, triggerContext: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>): void;
};
//# sourceMappingURL=schedule-action.handler.d.ts.map