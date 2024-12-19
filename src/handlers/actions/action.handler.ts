/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventDto } from '../../dto/events/event.dto';
import { EventPhaseEnum } from '../../enums/event-phase.enum';
import { StatusStateDto } from '../../dto/states/status.state.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { IActionHandler } from '../../interfaces/action-handler.interface';
import { ActionDto } from '../../dto/actions/action.dto';
import { ActionStateDto } from '../../dto/action-states/action.state.dto';
import { IStatusHolder } from '../../interfaces/status-holder.interface';
import { ActionInstanceDto } from '../../dto/instances/action.instance.dto';
import { BuiltinEventTypeEnum } from '../../enums/builtin-event-type.enum';
import { StackCounterTriggerHandler } from '../triggers/stack-counter-trigger.handler';
import { TriggerEventDto } from '../../dto/events/trigger.event.dto';
import { DynamicContextService, LogicService } from 'ts-logic-framework';

export abstract class ActionHandler<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> implements IActionHandler
{
  async apply(
    context: TriggerContextDto<TAction, TActionState>,
  ): Promise<boolean> {
    if (context.action.action.attachable) {
      const statusHolder = context.action.target as IStatusHolder;
      if (statusHolder) {
        const effect = statusHolder.tryAddStatus(context.action, context);
        if (!effect) {
          this.remove(context.action);
        }
      }
    }
    if (context.action.stacks) {
      context.action.engine.attachStack(context.action);
    }
    if ((context.action.triggers?.length ?? 0) > 0) {
      context.action.engine.attachTriggers(context.action);
      return true;
    } else {
      return this.trigger(context);
    }
  }
  async trigger(
    context: TriggerContextDto<TAction, TActionState>,
  ): Promise<boolean> {
    if (
      context.event === undefined ||
      context.action.statusEffect === undefined
    ) {
      return this.perform(context, true);
    }
    throw new Error('Not yet implemented.');
  }
  async perform(
    context: TriggerContextDto<TAction, TActionState>,
    callNext: boolean,
  ): Promise<boolean> {
    if (!(await this.tryRun(context))) {
      if (context.action.debug) {
        console.debug('Action', context.action.action.type, 'failed to run');
      }
      return false;
    }
    if (context.action.stacks) {
      const event = <TriggerEventDto>{
        type: BuiltinEventTypeEnum.TRIGGER,
      };
      for (const trigger of context.action.stacks.triggers.filter(
        (t) => t.event === BuiltinEventTypeEnum.TRIGGER,
      )) {
        await StackCounterTriggerHandler.handle(trigger, event);
      }
    }
    if (callNext && context.action.action.next) {
      const next = LogicService.resolve<string>(
        context.action.action.next,
        context,
      );
      if (next) {
        const params = context.action.action.out
          ? Object.fromEntries(
              Object.entries(context.action.action.out).map(([key, value]) => [
                key,
                LogicService.resolve(value, context),
              ]),
            )
          : {};
        await context.action.engine.tryRun({
          ...DynamicContextService.createContext(
            {
              engine: context.action.engine,
              program: context.action.program,
              initiator: context.action.source,
              source: context.action.source,
              actionId: next,
            },
            params,
          ),
        });
      } else if (context.action.debug) {
        console.warn(
          'Follow-up action reference is empty for action',
          context.action.actionId,
          'in program',
          context.action.program.id,
        );
      }
    }
    return true;
  }
  abstract tryRun(
    context: TriggerContextDto<TAction, TActionState>,
  ): Promise<boolean>;
  remove(action: ActionInstanceDto<TAction, TActionState>) {
    action.engine.detachStack(action);
    action.engine.detachTriggers(action);
  }
  async onEvent(
    action: ActionInstanceDto<TAction, TActionState>,
    event: EventDto,
    phase: EventPhaseEnum,
  ) {
    throw new Error(
      'onEvent() not implemented for handler ' + this.constructor.name,
    );
  }
  setAttached(
    effect: StatusStateDto,
    triggerContext: TriggerContextDto<TAction, TActionState>,
  ) {
    throw new Error(
      'setAttached() not implemented for handler ' + this.constructor.name,
    );
  }
}
