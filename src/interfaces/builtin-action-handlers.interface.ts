import { BuiltinActionTypeEnum } from '../enums/builtin-action-type.enum';
import { CompoundActionHandler } from '../handlers/actions/compound-action.handler';
import { ConditionActionHandler } from '../handlers/actions/condition-action.handler';
import { DummyActionHandler } from '../handlers/actions/dummy-action.handler';
import { MessageActionHandler } from '../handlers/actions/message-action.handler';
import { RepeatActionHandler } from '../handlers/actions/repeat-action.handler';
import { InterceptActionHandler } from '../handlers/actions/intercept-action.handler';

export const BuiltinActionHandlers = {
  [BuiltinActionTypeEnum.COMPOUND]: CompoundActionHandler,
  [BuiltinActionTypeEnum.CONDITION]: ConditionActionHandler,
  [BuiltinActionTypeEnum.DUMMY]: DummyActionHandler,
  [BuiltinActionTypeEnum.INTERCEPT]: InterceptActionHandler,
  [BuiltinActionTypeEnum.MESSAGE]: MessageActionHandler,
  [BuiltinActionTypeEnum.REPEAT]: RepeatActionHandler,
};
