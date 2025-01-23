import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';
import { Computable } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';

export type ScheduleConfigurationDto = {
  action: string;
  params?: ParamsBlockConfigurationDto;
  delay?: number;
  every?: number;
  times?: number;
};

export type ScheduleActionStateDto = {
  schedule: Computable<ScheduleConfigurationDto | ScheduleConfigurationDto[]>;
} & ActionStateDto;

export type ScheduleActionDto = {
  type: BuiltinActionTypeEnum.SCHEDULE;
  apply: ScheduleActionStateDto;
} & ActionDto;
