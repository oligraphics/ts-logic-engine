import { CounterMethodEnum } from '../../enums/counter-method.enum';
import { TriggerInstanceDto } from './trigger.instance.dto';
import { ActionDto } from '../actions/action.dto';
import { ActionStateDto } from '../states/action.state.dto';
import { ICounterTriggerInstance } from '../../interfaces/counter-trigger-instance.interface';

export type CounterTriggerInstanceDto<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> = {
  type: CounterMethodEnum;
  amount: number;
} & TriggerInstanceDto<TAction, TActionState> &
  ICounterTriggerInstance;
