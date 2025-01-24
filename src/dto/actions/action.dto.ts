import { ActionTriggerDto } from '../triggers/action.trigger.dto';
import { Computable } from 'ts-logic-framework';
import { StackCounterDto } from '../stacks/stack-counter.dto';
import { ITargetable } from '../../interfaces/target.interface';
import { AfterBlockConfigurationDto } from '../configurations/after-block.configuration.dto';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';

export type ActionStateDto = object;

export type ActionDto = {
  enabled?: boolean;
  name?: string;
  description?: string;
  type: string;
  attachable?: boolean;
  properties?: ParamsBlockConfigurationDto;
  computed?: ParamsBlockConfigurationDto;
  target?: Computable<ITargetable>;
  targets?: Computable<ITargetable[]>;
  triggers?: ActionTriggerDto[];
  apply: ActionStateDto;
  stack?: StackCounterDto;
  after?: AfterBlockConfigurationDto;
  debug?: boolean;
};
