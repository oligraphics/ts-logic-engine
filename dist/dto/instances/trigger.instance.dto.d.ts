import { TriggerDto } from '../triggers/trigger.dto';
import { ActionDto } from '../actions/action.dto';
import { ITriggerInstance } from '../../interfaces/trigger-instance.interface';
import { ActionStateDto } from '../states/action.state.dto';
import { ActionInstanceDto } from './action.instance.dto';
export type TriggerInstanceDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    id: string;
    action: ActionInstanceDto<TAction, TActionState>;
} & TriggerDto & ITriggerInstance;
//# sourceMappingURL=trigger.instance.dto.d.ts.map