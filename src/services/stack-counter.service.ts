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

export const StackCounterService = new (class StackCounterService {
  tryChange(
    context: ITriggerContext,
    method: CounterMethodEnum,
    amount: number,
  ): boolean {
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
    const success = action.engine.callEvent(
      trigger.action.target,
      event,
      (event) => {
        stack.value = CounterMethodService.getChangedValue(
          stack.value,
          event.method,
          event.amount,
        );
        return true;
      },
    );
    if (success) {
      this.changed(stack);
    }
    return success;
  }
  changed(stack: IStackCounterInstance) {
    if (stack.value <= 0 && !stack.persistent) {
      this.remove(stack);
    }
  }
  remove(stack: IStackCounterInstance) {
    if (stack.removed) {
      console.error('Trying to remove an already removed stack');
      return;
    }
    stack.removed = true;
    const event = <StackRemoveEventDto>{
      type: BuiltinEventTypeEnum.STACK_REMOVE,
      stack,
    };
    stack.action.engine.callEvent(stack.action.target, event);
    stack.action.engine.remove(stack.action);
  }
})();
