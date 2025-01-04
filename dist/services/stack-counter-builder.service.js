"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackCounterBuilderService = void 0;
const counter_builder_service_1 = require("./counter-builder.service");
const counter_method_enum_1 = require("../enums/counter-method.enum");
const builtin_trigger_type_enum_1 = require("../enums/builtin-trigger-type.enum");
const counter_trigger_builder_service_1 = require("./counter-trigger-builder.service");
const event_phase_enum_1 = require("../enums/event-phase.enum");
const builtin_event_type_enum_1 = require("../enums/builtin-event-type.enum");
exports.StackCounterBuilderService = new (class StackCounterBuilderService {
    build(configuration, action) {
        const counter = counter_builder_service_1.CounterBuilderService.build(configuration, builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.STACK, counter_method_enum_1.CounterMethodEnum.REDUCE, 1, action);
        if (counter.triggers.length === 0) {
            counter.triggers.push(counter_trigger_builder_service_1.CounterTriggerBuilderService.build({
                event: builtin_event_type_enum_1.BuiltinEventTypeEnum.TRIGGER,
                phase: event_phase_enum_1.EventPhaseEnum.PERFORMED,
            }, builtin_trigger_type_enum_1.BuiltinTriggerTypeEnum.COUNTER, counter_method_enum_1.CounterMethodEnum.REDUCE, 1, action));
        }
        return {
            ...counter,
            persistent: !!configuration.persistent,
        };
    }
})();
//# sourceMappingURL=stack-counter-builder.service.js.map