import { CounterTriggerInstanceDto } from './counter-trigger.instance.dto';
import { ActionDto, ActionStateDto } from '../actions/action.dto';
import { ActionInstanceDto } from './action.instance.dto';
export type CounterInstanceDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    action: ActionInstanceDto<TAction, TActionState>;
    counter: number;
    triggers: CounterTriggerInstanceDto<TAction, TActionState>[];
};
//# sourceMappingURL=counter.instance.dto.d.ts.map