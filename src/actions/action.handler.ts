/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventDto } from '../dto/events/event.dto';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { TriggerContextDto } from '../dto/contexts/trigger.context.dto';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { ActionDto } from '../dto/actions/action.dto';
import { ActionStateDto } from '../dto/states/action.state.dto';
import { IStatusHolder } from '../interfaces/status-holder.interface';
import { ActionInstanceDto } from '../dto/instances/action.instance.dto';

export abstract class ActionHandler<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> implements IActionHandler
{
  apply(context: TriggerContextDto<TAction, TActionState>): boolean {
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
      throw new Error('Not yet implemented.');
    }
    if ((context.action.triggers?.length ?? 0) > 0) {
      context.action.engine.attachTriggers(context.action);
      return true;
    } else {
      return this.trigger(context);
    }
  }
  trigger(context: TriggerContextDto<TAction, TActionState>): boolean {
    if (
      context.event === undefined ||
      context.action.statusEffect === undefined
    ) {
      return this.perform(context, true);
    }
    throw new Error('Not yet implemented.');
  }
  perform(
    context: TriggerContextDto<TAction, TActionState>,
    callNext: boolean,
  ): boolean {
    if (!this.tryRun(context)) {
      if (context.action.debug) {
        console.debug('Action', context.action.action.type, 'failed to run');
      }
      return false;
    }
    if (callNext && context.action.action.next) {
      throw new Error('Not ready yet');
    }
    return true;
  }
  abstract tryRun(context: TriggerContextDto<TAction, TActionState>): boolean;
  remove(context: ActionInstanceDto<TAction, TActionState>) {
    throw new Error(
      'remove() not implemented for handler ' + this.constructor.name,
    );
  }
  onEvent(
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
