import { TriggerInstanceDto } from './trigger.instance.dto';
import { ActionDto } from '../actions/action.dto';
import { ActionStateDto } from '../action-states/action.state.dto';

export type InterceptTriggerInstanceDto<
  TAction extends ActionDto,
  TActionState extends ActionStateDto,
> = {
  handler: string;
} & TriggerInstanceDto<TAction, TActionState>;
