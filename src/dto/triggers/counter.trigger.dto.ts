import { TriggerDto } from './trigger.dto';
import { DynamicValue } from 'ts-logic-framework';

export type CounterTriggerDto = {
  method?: DynamicValue;
  amount?: DynamicValue;
} & TriggerDto;
