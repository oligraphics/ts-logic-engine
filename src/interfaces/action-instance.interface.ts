import { ActionStateDto } from '../dto/action-states/action.state.dto';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { ITriggerInstance } from './trigger-instance.interface';
import { IActionContext } from './action-context.interface';
import { IStackCounterInstance } from './stack-counter-instance.interface';

export type IActionInstance = {
  get id(): string;
  get state(): ActionStateDto;
  triggers: ITriggerInstance[] | undefined;
  stacks: IStackCounterInstance | undefined;
  get statusEffect(): StatusStateDto | undefined;
  get debug(): boolean | undefined;
} & IActionContext;
