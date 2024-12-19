import { TriggerDto } from './trigger.dto';
import { DynamicValue } from 'ts-logic-framework';

export type ActionTriggerDto = {
  reaction?: DynamicValue;
} & TriggerDto;
