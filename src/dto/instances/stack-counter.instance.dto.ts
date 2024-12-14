import { CounterInstanceDto } from './counter.instance.dto';
import { ActionDto } from '../actions/action.dto';
import { ActionStateDto } from '../states/action.state.dto';

export type StackCounterInstanceDto<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> = CounterInstanceDto<TAction, TActionState>;
