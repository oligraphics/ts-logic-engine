import { ActionTriggerDto } from '../dto/triggers/action.trigger.dto';
import { IdService } from 'ts-logic-framework';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { BuiltinTriggerTypeEnum } from '../enums/builtin-trigger-type.enum';
import { IActionTriggerInstance } from '../interfaces/action-trigger-instance.interface';

export const ActionTriggerBuilderService = new (class TriggerBuilderService {
  buildAll(
    configurations: ActionTriggerDto[],
    action: IActionInstance,
  ): IActionTriggerInstance[] {
    return configurations.map((c) => this.build(c, action));
  }
  build(
    configuration: ActionTriggerDto,
    action: IActionInstance,
  ): IActionTriggerInstance {
    return {
      id: IdService.createRandomId(),
      type: BuiltinTriggerTypeEnum.ACTION,
      ...configuration,
      action,
    };
  }
})();
