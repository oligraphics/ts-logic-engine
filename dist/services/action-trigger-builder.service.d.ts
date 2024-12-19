import { ActionTriggerDto } from '../dto/triggers/action.trigger.dto';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { IActionTriggerInstance } from '../interfaces/action-trigger-instance.interface';
export declare const ActionTriggerBuilderService: {
    buildAll(configurations: ActionTriggerDto[], action: IActionInstance): IActionTriggerInstance[];
    build(configuration: ActionTriggerDto, action: IActionInstance): IActionTriggerInstance;
};
//# sourceMappingURL=action-trigger-builder.service.d.ts.map