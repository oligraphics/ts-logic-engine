import { CounterMethodEnum } from '../../enums/counter-method.enum';
import { TriggerInstanceDto } from './trigger.instance.dto';
import { ActionDto, ActionStateDto } from '../actions/action.dto';
import { ICounterTriggerInstance } from '../../interfaces/counter-trigger-instance.interface';
export type CounterTriggerInstanceDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    type: CounterMethodEnum;
    amount: number;
} & TriggerInstanceDto<TAction, TActionState> & ICounterTriggerInstance;
//# sourceMappingURL=counter-trigger.instance.dto.d.ts.map