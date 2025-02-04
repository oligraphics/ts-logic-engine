import { ActionHandler } from './action.handler';
import {
  ScheduleActionDto,
  ScheduleActionStateDto,
  ScheduleConfigurationDto,
} from '../../dto/actions/schedule.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import {
  DynamicContext,
  DynamicContextService,
  IdService,
  LogicService,
} from 'ts-logic-framework';
import { ScheduleInstanceDto } from '../../dto/instances/schedule.instance.dto';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { ParamsService } from '../../services/params.service';
import { IActor } from '../../interfaces/actor.interface';
import { CustomTriggerDto } from '../../dto/triggers/custom.trigger.dto';
import { CustomTriggerBuilderService } from '../../services/custom-trigger-builder.service';
import { ICustomTriggerInstance } from '../../interfaces/custom-trigger-instance.interface';
import { AfterBlockConfigurationDto } from '../../dto/configurations/after-block.configuration.dto';

export const ScheduleActionHandler =
  new (class ScheduleActionHandler extends ActionHandler<
    ScheduleActionDto,
    ScheduleActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<ScheduleActionDto, ScheduleActionStateDto>,
    ): Promise<boolean> {
      const { action } = context;
      const { state, debug } = action;
      const innerContext = {
        ...context,
        ...action,
      };

      const scheduleInput = Array.isArray(state.schedule)
        ? state.schedule
            .map((entry) =>
              LogicService.resolve<ScheduleConfigurationDto>(
                entry,
                innerContext,
                debug,
              ),
            )
            .filter((item) => item !== undefined)
        : LogicService.resolve<ScheduleInstanceDto | ScheduleInstanceDto[]>(
            state.schedule,
            innerContext,
            debug,
          );
      if (!scheduleInput) {
        console.error(
          'Schedule action did not return any schedule entries',
          action,
        );
        return false;
      }
      const schedule: ScheduleInstanceDto[] = (
        Array.isArray(scheduleInput) ? scheduleInput : [scheduleInput]
      ).map((s): ScheduleInstanceDto => {
        return {
          ...s,
          id: IdService.createRandomId(8),
          timeout: s.delay ?? 0,
          iteration: 0,
          remainingTimes: s.times ?? 0,
        };
      });

      const cancelTriggers: ICustomTriggerInstance[] = [];
      const updateHandler = this.createUpdateHandler(
        action,
        schedule.reverse(),
        cancelTriggers,
        innerContext,
        debug,
      );
      const cancelHandler = this.createCancelHandler(
        action,
        updateHandler,
        cancelTriggers,
        state.cancelled,
        innerContext,
        debug,
      );

      const cancelInput =
        state.cancel !== undefined
          ? LogicService.resolve<CustomTriggerDto | CustomTriggerDto[]>(
              state.cancel,
              innerContext,
              debug,
            )
          : undefined;
      cancelTriggers.push(
        ...CustomTriggerBuilderService.buildAll(
          (Array.isArray(cancelInput)
            ? cancelInput
            : cancelInput
            ? [cancelInput]
            : []
          ).map((t) => {
            t.trigger = async () => {
              // Cancel schedule
              await cancelHandler();
            };
            return t;
          }),
          action,
        ),
      );

      if (debug) {
        console.debug('Run Schedule:', schedule);
        if (cancelTriggers.length > 0) {
          console.log('Cancellation triggers:', cancelTriggers);
        }
      }

      action.engine.bus.on('update', updateHandler);

      action.engine.attach(cancelTriggers, debug);

      await updateHandler(0);

      return true;
    }

    createUpdateHandler(
      action: IActionInstance,
      schedule: ScheduleInstanceDto[],
      cancelTriggers: ICustomTriggerInstance[],
      context: DynamicContext,
      debug?: boolean,
    ): (deltaTime?: number) => Promise<void> {
      const result = async (deltaTime?: number): Promise<void> => {
        for (let i = schedule.length - 1; i >= 0; i -= 1) {
          const entry = schedule[i];
          entry.timeout -= deltaTime ?? 0;
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
          action.engine.bus.off(
            'update',
            result as (data: unknown) => Promise<void>,
          );
          action.engine.detach(cancelTriggers);
        }
      };
      return result;
    }

    createCancelHandler(
      action: IActionInstance,
      updateHandler: () => Promise<void>,
      cancelTriggers: ICustomTriggerInstance[],
      cancelled: AfterBlockConfigurationDto | undefined,
      context: DynamicContext,
      debug?: boolean,
    ) {
      return async () => {
        action.engine.bus.off('update', updateHandler);
        action.engine.detach(cancelTriggers, debug);
        const next = cancelled?.next
          ? LogicService.resolve<string>(cancelled.next, context, debug)
          : undefined;
        if (next) {
          const params = cancelled?.params
            ? ParamsService.resolve(cancelled.params, context, debug)
            : undefined;
          await action.engine.tryRun({
            ...DynamicContextService.createContext({
              actionId: next,
              program: action.program,
              initiator: action.initiator,
              source: (action.target as IActor)?.id
                ? (action.target as IActor)
                : action.source,
              engine: action.engine,
            }),
            params,
          });
        }
      };
    }

    async runScheduledAction(
      action: IActionInstance,
      instance: ScheduleInstanceDto,
      context: DynamicContext,
      debug?: boolean,
    ) {
      if (instance.action === undefined) {
        return;
      }
      const params = instance.params
        ? ParamsService.resolve(instance.params, context, debug)
        : undefined;
      await action.engine.tryRun({
        ...DynamicContextService.createContext({
          actionId: instance.action,
          program: action.program,
          initiator: action.initiator,
          source: (action.target as IActor)?.id
            ? (action.target as IActor)
            : action.source,
          engine: action.engine,
        }),
        params,
      });
    }
  })();
