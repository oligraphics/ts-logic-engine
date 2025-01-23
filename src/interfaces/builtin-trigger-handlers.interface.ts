import { BuiltinTriggerTypeEnum } from '../enums/builtin-trigger-type.enum';
import { ActionTriggerHandler } from '../handlers/triggers/action-trigger.handler';
import { StackCounterTriggerHandler } from '../handlers/triggers/stack-counter-trigger.handler';
import { CounterTriggerHandler } from '../handlers/triggers/counter-trigger.handler';
import { CustomTriggerHandler } from '../handlers/triggers/custom-trigger.handler';

export const BuiltinTriggerHandlers = {
  [BuiltinTriggerTypeEnum.ACTION]: ActionTriggerHandler,
  [BuiltinTriggerTypeEnum.COUNTER]: CounterTriggerHandler,
  [BuiltinTriggerTypeEnum.CUSTOM]: CustomTriggerHandler,
  [BuiltinTriggerTypeEnum.STACK]: StackCounterTriggerHandler,
};
