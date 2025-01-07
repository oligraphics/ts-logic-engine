import { ITriggerContext } from '../interfaces/trigger-context.interface';
import { CounterMethodEnum } from '../enums/counter-method.enum';
import { ICounterTriggerInstance } from '../interfaces/counter-trigger-instance.interface';
import { EventDto } from '../dto/events/event.dto';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { CounterMethodService } from './counter-method.service';
import { StackChangeEventDto } from '../dto/events/stack-change.event.dto';
import { BuiltinEventTypeEnum } from '../enums/builtin-event-type.enum';
import { IStackCounterInstance } from '../interfaces/stack-counter-instance.interface';
import { StackRemoveEventDto } from '../dto/events/stack-remove.event.dto';
import { LogicService } from 'ts-logic-framework';
import { ParamsService } from './params.service';

export const StackCounterService = new (class StackCounterService {
  async tryChange(
    context: ITriggerContext,
    method: CounterMethodEnum,
    amount: number,
  ): Promise<boolean> {
    const { trigger, action } = context as {
      trigger: ICounterTriggerInstance;
      event: EventDto;
      action: IActionInstance;
    };
    if (trigger.debug) {
      console.warn(`Try changing counter: ${method} ${amount}`);
    }
    const stack = action.stacks as IStackCounterInstance;
    const oldValue = stack.value;
    const newValue = CounterMethodService.getChangedValue(
      oldValue,
      method,
      amount,
    );
    const change = newValue - oldValue;
    const event: StackChangeEventDto = <StackChangeEventDto>{
      type: BuiltinEventTypeEnum.STACK_CHANGE,
      action: context.action,
      stack,
      method,
      amount,
      oldValue,
      newValue,
      change,
      cancelable: true,
    };
    const success = await action.engine.callEvent(
      trigger.action.target,
      event,
      async (event) => {
        stack.value = CounterMethodService.getChangedValue(
          stack.value,
          event.method,
          event.amount,
        );
        return true;
      },
      trigger.action.debug,
    );
    if (success) {
      await this.changed(stack);
    }
    return success;
  }
  async changed(stack: IStackCounterInstance) {
    if (stack.value <= 0 && !stack.persistent) {
      await this.remove(stack);
    }
  }
  async remove(stack: IStackCounterInstance) {
    if (stack.removed) {
      console.error('Trying to remove an already removed stack');
      return;
    }
    if (stack.action.debug) {
      console.debug(
        'Remove stack counter of action',
        stack.action.program.id,
        '>',
        stack.action.actionId,
      );
    }
    stack.removed = true;
    const event = <StackRemoveEventDto>{
      type: BuiltinEventTypeEnum.STACK_REMOVE,
      stack,
    };
    await stack.action.engine.callEvent(
      stack.action.target,
      event,
      async () => {
        stack.action.engine.remove(stack.action);
      },
      stack.action.debug,
    );
    if (stack.after) {
      const next = LogicService.resolve<string>(stack.after.next, stack.action);
      if (!next) {
        if (stack.action.debug) {
          console.error(
            'Stack specified after hook but returned no action id',
            stack.after,
          );
        }
        return;
      }
      const params = stack.after.params
        ? ParamsService.resolve(stack.after.params, stack.action)
        : {};
      await stack.action.engine.tryRun({
        engine: stack.action.engine,
        initiator: stack.action.initiator,
        source: stack.action.source,
        program: stack.action.program,
        actionId: next,
        params,
      });
    }
  }
})();
