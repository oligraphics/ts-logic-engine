import { ActionDto, ActionStateDto } from '../actions/action.dto';
import { IActionInstance } from '../../interfaces/action-instance.interface';
import { TriggerInstanceDto } from './trigger.instance.dto';
import { StatusStateDto } from '../states/status.state.dto';
import { ActionContextDto } from '../contexts/action.context.dto';
export type ActionInstanceDto<TAction extends ActionDto, TActionState extends ActionStateDto> = {
    id: string;
    state: TActionState;
    triggers?: TriggerInstanceDto<TAction, TActionState>[];
    stack?: unknown;
    statusEffect?: StatusStateDto;
    debug?: boolean;
} & IActionInstance & ActionContextDto<TAction>;
//# sourceMappingURL=action.instance.dto.d.ts.map