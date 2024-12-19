"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinTriggerHandlers = void 0;
const builtin_trigger_type_enum_1 = require("../enums/builtin-trigger-type.enum");
const action_trigger_handler_1 = require("../handlers/triggers/action-trigger.handler");
const stack_counter_trigger_handler_1 = require("../handlers/triggers/stack-counter-trigger.handler");
const counter_trigger_handler_1 = require("../handlers/triggers/counter-trigger.handler");
exports.BuiltinTriggerHandlers = {
    [builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.ACTION]: action_trigger_handler_1.ActionTriggerHandler,
    [builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.COUNTER]: counter_trigger_handler_1.CounterTriggerHandler,
    [builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.STACK]: stack_counter_trigger_handler_1.StackCounterTriggerHandler,
};
//# sourceMappingURL=builtin-trigger-handlers.interface.js.map