import { DynamicValue } from 'ts-logic-framework';

export type RepeatActionStateDto = {
  repeat: DynamicValue;
  action: DynamicValue;
  params?: { [key: string]: DynamicValue };
};
