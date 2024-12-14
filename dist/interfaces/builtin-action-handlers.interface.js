"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinActionHandlers = void 0;
const global_action_type_enum_1 = require("../enums/global-action-type.enum");
const compound_action_handler_1 = require("../actions/compound-action.handler");
const condition_action_handler_1 = require("../actions/condition-action.handler");
const dummy_action_handler_1 = require("../actions/dummy-action.handler");
const message_action_handler_1 = require("../actions/message-action.handler");
exports.BuiltinActionHandlers = {
    [global_action_type_enum_1.GlobalActionTypeEnum.COMPOUND]: compound_action_handler_1.CompoundActionHandler,
    [global_action_type_enum_1.GlobalActionTypeEnum.CONDITION]: condition_action_handler_1.ConditionActionHandler,
    [global_action_type_enum_1.GlobalActionTypeEnum.DUMMY]: dummy_action_handler_1.DummyActionHandler,
    [global_action_type_enum_1.GlobalActionTypeEnum.MESSAGE]: message_action_handler_1.MessageActionHandler,
};
//# sourceMappingURL=builtin-action-handlers.interface.js.map