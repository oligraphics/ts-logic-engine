import { IActionInstance } from '../interfaces/action-instance.interface';
import { CustomTriggerDto } from '../dto/triggers/custom.trigger.dto';
import { ICustomTriggerInstance } from '../interfaces/custom-trigger-instance.interface';
export declare const CustomTriggerBuilderService: {
    buildAll(configurations: CustomTriggerDto[], action: IActionInstance): ICustomTriggerInstance[];
    build(configuration: CustomTriggerDto, action: IActionInstance): ICustomTriggerInstance;
};
//# sourceMappingURL=custom-trigger-builder.service.d.ts.map