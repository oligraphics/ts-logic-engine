import { ActionDto } from '../actions/action.dto';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { ActionStateDto } from '../states/action.state.dto';
import { TriggerInstanceDto } from './trigger.instance.dto';
import { StatusStateDto } from '../states/status.state.dto';
import { ActionContextDto } from '../contexts/action.context.dto';

export type ActionInstanceDto<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> = {
  id: string;
  state: TActionState;
  triggers?: TriggerInstanceDto<TAction, TActionState>[];
  stacks?: unknown;
  statusEffect?: StatusStateDto;
  debug?: boolean;
} & IActionInstance &
  ActionContextDto<TAction>;
