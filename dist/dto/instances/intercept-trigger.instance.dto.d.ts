import { TriggerInstanceDto } from './trigger.instance.dto';
import { ActionDto, ActionStateDto } from '../actions/action.dto';
export type InterceptTriggerInstanceDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    handler: string;
} & TriggerInstanceDto<TAction, TActionState>;
//# sourceMappingURL=intercept-trigger.instance.dto.d.ts.map