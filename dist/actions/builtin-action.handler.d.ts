import { ActionHandler } from './action.handler';
import { LogicEngine } from '../engine/logic.engine';
import { ActionDto } from '../dto/actions/action.dto';
import { ActionStateDto } from '../dto/states/action.state.dto';
export declare abstract class BuiltinActionHandler<TAction extends ActionDto, TActionState extends ActionStateDto> extends ActionHandler<LogicEngine, TAction, TActionState> {
}
//# sourceMappingURL=builtin-action.handler.d.ts.map