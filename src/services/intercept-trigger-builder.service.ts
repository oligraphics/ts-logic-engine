import { ActionTriggerDto } from '../dto/triggers/action.trigger.dto';
import { IdService } from 'ts-logic-framework';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { BuiltinTriggerTypeEnum } from '../enums/builtin-trigger-type.enum';

export const InterceptTriggerBuilderService =
  new (class InterceptTriggerBuilderService {
    buildAll(
      configurations: ActionTriggerDto[],
      action: IActionInstance,
    ): ITriggerInstance[] {
      return configurations.map((c) => this.build(c, action));
    }
    build(
      configuration: ActionTriggerDto,
      action: IActionInstance,
    ): ITriggerInstance {
      return {
        id: IdService.createRandomId(),
        type: BuiltinTriggerTypeEnum.ACTION,
        ...configuration,
        action,
      };
    }
  })();
