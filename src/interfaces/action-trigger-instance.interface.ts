import { DynamicValue } from 'ts-logic-framework';
import { ITriggerInstance } from './trigger-instance.interface';

export type IActionTriggerInstance = {
  reaction?: DynamicValue;
} & ITriggerInstance;
