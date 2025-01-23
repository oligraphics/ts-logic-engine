"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleActionHandler = void 0;
const action_handler_1 = require("./action.handler");
const ts_logic_framework_1 = require("ts-logic-framework");
const params_service_1 = require("../../services/params.service");
exports.ScheduleActionHandler = new (class ScheduleActionHandler extends action_handler_1.ActionHandler {
    async tryRun(context) {
        const { action } = context;
        const { state, debug } = action;
        const innerContext = {
            ...context,
            ...action,
        };
        const scheduleInput = Array.isArray(state.schedule)
            ? state.schedule
                .map((entry) => ts_logic_framework_1.LogicService.resolve(entry, innerContext, debug))
                .filter((item) => item !== undefined)
            : ts_logic_framework_1.LogicService.resolve(state.schedule, innerContext, debug);
        if (!scheduleInput) {
            console.error('Schedule action did not return any schedule entries', action);
            return false;
        }
        const schedule = (Array.isArray(scheduleInput) ? scheduleInput : [scheduleInput]).map((s) => {
            return {
                ...s,
                id: ts_logic_framework_1.IdService.createRandomId(8),
                timeout: s.delay ?? 0,
                iteration: 0,
                remainingTimes: s.times ?? 0,
            };
        });
        if (debug) {
            console.debug('Run Schedule:', schedule);
        }
        const updateHandler = this.createUpdateHandler(action, schedule.reverse(), innerContext, debug);
        action.engine.bus.on('update', updateHandler);
        await updateHandler(0);
        return true;
    }
    createUpdateHandler(action, schedule, context, debug) {
        const result = async (deltaTime) => {
            for (let i = schedule.length - 1; i >= 0; i -= 1) {
                const entry = schedule[i];
                entry.timeout -= deltaTime;
                if (entry.timeout > 0) {
                    continue;
                }
                await this.runScheduledAction(action, entry, context, debug);
                if (entry.every === undefined || entry.every <= 0) {
                    schedule.splice(i, 1);
                    continue;
                }
                if (entry.remainingTimes > 0) {
                    entry.remainingTimes -= 1;
                    if (entry.remainingTimes <= 0) {
                        schedule.splice(i, 1);
                        continue;
                    }
                    entry.timeout = entry.every;
                    entry.iteration++;
                }
            }
            if (schedule.length === 0) {
                action.engine.bus.off('update', result);
            }
        };
        return result;
    }
    async runScheduledAction(action, instance, context, debug) {
        if (instance.action === undefined) {
            return;
        }
        const params = instance.params
            ? params_service_1.ParamsService.resolve(instance.params, context, debug)
            : undefined;
        await action.engine.tryRun({
            ...ts_logic_framework_1.DynamicContextService.createContext({
                actionId: instance.action,
                program: action.program,
                initiator: action.initiator,
                source: action.target?.id
                    ? action.target
                    : action.source,
                engine: action.engine,
            }),
            params,
        });
    }
})();
//# sourceMappingURL=schedule-action.handler.js.map