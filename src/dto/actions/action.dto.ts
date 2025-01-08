import { ActionTriggerDto } from '../triggers/action.trigger.dto';
import { Computable } from 'ts-logic-framework';
import { StackCounterDto } from '../stacks/stack-counter.dto';
import { ITargetable } from '../../interfaces/target.interface';

export type ActionStateDto = object;

export type ActionDto = {
  type: string;
  attachable?: boolean;
  properties?: { [key: string]: Computable<unknown> };
  computed?: { [key: string]: Computable<unknown> };
  target?: Computable<ITargetable>;
  targets?: Computable<ITargetable[]>;
  triggers?: ActionTriggerDto[];
  apply: ActionStateDto;
  stack?: StackCounterDto;
  out?: { [key: string]: Computable<unknown> };
  next?: Computable<string>;
  debug?: boolean;
};
