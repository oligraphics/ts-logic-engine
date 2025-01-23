import { ScheduleConfigurationDto } from '../actions/schedule.action.dto';

export type ScheduleInstanceDto = {
  id: string;
  timeout: number;
  iteration: number;
  remainingTimes: number;
} & ScheduleConfigurationDto;
