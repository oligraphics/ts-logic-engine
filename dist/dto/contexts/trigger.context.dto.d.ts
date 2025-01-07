import { EventDto } from '../events/event.dto';
import { ITriggerContext } from '../../interfaces/trigger-context.interface';
import { ActionDto, ActionStateDto } from '../actions/action.dto';
import { ActionInstanceDto } from '../instances/action.instance.dto';
export type TriggerContextDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    event?: EventDto;
    action: ActionInstanceDto<TAction, TActionState>;
} & ITriggerContext;
//# sourceMappingURL=trigger.context.dto.d.ts.map