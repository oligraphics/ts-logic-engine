"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinActionHandlers = void 0;
const builtin_action_type_enum_1 = require("../enums/builtin-action-type.enum");
const compound_action_handler_1 = require("../handlers/actions/compound-action.handler");
const condition_action_handler_1 = require("../handlers/actions/condition-action.handler");
const dummy_action_handler_1 = require("../handlers/actions/dummy-action.handler");
const message_action_handler_1 = require("../handlers/actions/message-action.handler");
const repeat_action_handler_1 = require("../handlers/actions/repeat-action.handler");
const intercept_action_handler_1 = require("../handlers/actions/intercept-action.handler");
exports.BuiltinActionHandlers = {
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.COMPOUND]: compound_action_handler_1.CompoundActionHandler,
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.CONDITION]: condition_action_handler_1.ConditionActionHandler,
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.DUMMY]: dummy_action_handler_1.DummyActionHandler,
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.INTERCEPT]: intercept_action_handler_1.InterceptActionHandler,
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.MESSAGE]: message_action_handler_1.MessageActionHandler,
    [builtin_action_type_enum_1.BuiltinActionTypeEnum.REPEAT]: repeat_action_handler_1.RepeatActionHandler,
};
//# sourceMappingURL=builtin-action-handlers.interface.js.map