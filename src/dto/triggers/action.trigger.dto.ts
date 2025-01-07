import { TriggerDto } from './trigger.dto';
import { Computable } from 'ts-logic-framework';

export type ActionTriggerDto = {
  reaction?: Computable<string>;
} & TriggerDto;
