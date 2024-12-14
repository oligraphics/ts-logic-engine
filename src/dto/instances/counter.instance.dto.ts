import { CounterTriggerInstanceDto } from './counter-trigger.instance.dto';
import { ActionStateDto } from '../states/action.state.dto';
import { ActionDto } from '../actions/action.dto';
import { ActionInstanceDto } from './action.instance.dto';

export type CounterInstanceDto<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> = {
  action: ActionInstanceDto<TAction, TActionState>;
  counter: number;
  triggers: CounterTriggerInstanceDto<TAction, TActionState>[];
};
