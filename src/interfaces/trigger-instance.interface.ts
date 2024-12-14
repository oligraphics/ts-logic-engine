import { TriggerDto } from '../dto/triggers/trigger.dto';
import { IActionInstance } from './action-instance.interface';

export type ITriggerInstance = {
  get id(): string;
  get action(): IActionInstance;
} & TriggerDto;
