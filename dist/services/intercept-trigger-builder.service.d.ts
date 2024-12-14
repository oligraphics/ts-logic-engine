import { ActionTriggerDto } from '../dto/triggers/action.trigger.dto';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
export declare const InterceptTriggerBuilderService: {
    buildAll(configurations: ActionTriggerDto[], action: IActionInstance): ITriggerInstance[];
    build(configuration: ActionTriggerDto, action: IActionInstance): ITriggerInstance;
};
//# sourceMappingURL=intercept-trigger-builder.service.d.ts.map