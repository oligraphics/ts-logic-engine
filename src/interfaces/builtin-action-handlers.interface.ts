import { GlobalActionTypeEnum } from '../enums/global-action-type.enum';
import { CompoundActionHandler } from '../actions/compound-action.handler';
import { ConditionActionHandler } from '../actions/condition-action.handler';
import { DummyActionHandler } from '../actions/dummy-action.handler';
import { MessageActionHandler } from '../actions/message-action.handler';

export const BuiltinActionHandlers = {
  [GlobalActionTypeEnum.COMPOUND]: CompoundActionHandler,
  [GlobalActionTypeEnum.CONDITION]: ConditionActionHandler,
  [GlobalActionTypeEnum.DUMMY]: DummyActionHandler,
  [GlobalActionTypeEnum.MESSAGE]: MessageActionHandler,
};
