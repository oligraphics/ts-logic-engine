import { IdService } from 'ts-logic-framework';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { BuiltinTriggerTypeEnum } from '../enums/builtin-trigger-type.enum';
import { CustomTriggerDto } from '../dto/triggers/custom.trigger.dto';
import { ICustomTriggerInstance } from '../interfaces/custom-trigger-instance.interface';

export const CustomTriggerBuilderService =
  new (class CustomTriggerBuilderService {
    buildAll(
      configurations: CustomTriggerDto[],
      action: IActionInstance,
    ): ICustomTriggerInstance[] {
      return configurations.map((c) => this.build(c, action));
    }
    build(
      configuration: CustomTriggerDto,
      action: IActionInstance,
    ): ICustomTriggerInstance {
      return {
        id: IdService.createRandomId(),
        type: BuiltinTriggerTypeEnum.CUSTOM,
        ...configuration,
        action,
      };
    }
  })();
