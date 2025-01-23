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

      if (debug) {
        console.debug('Run Schedule:', schedule);
      }

      const updateHandler = this.createUpdateHandler(
        action,
        schedule.reverse(),
        innerContext,
        debug,
      );
      action.engine.bus.on<number>(
        'update',
        updateHandler as (deltaTime: number | undefined) => Promise<void>,
      );

      await updateHandler(0);

      return true;
    }

    createUpdateHandler(
      action: IActionInstance,
      schedule: ScheduleInstanceDto[],
      context: DynamicContext,
      debug?: boolean,
    ): (deltaTime: number) => Promise<void> {
      const result = async (deltaTime: number): Promise<void> => {
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
          action.engine.bus.off(
            'update',
            result as (data: unknown) => Promise<void>,
          );
        }
      };
      return result;
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
