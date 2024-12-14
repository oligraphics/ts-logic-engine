import { ITriggerContext } from './trigger-context.interface';
import { IActionInstance } from './action-instance.interface';
import { StatusStateDto } from '../dto/states/status.state.dto';
import { ITargetable } from './target.interface';
export interface IStatusHolder extends ITargetable {
    tryAddStatus(action: IActionInstance, context: ITriggerContext): StatusStateDto;
    tryRemoveStatus(status: StatusStateDto, context: ITriggerContext): boolean;
    addStatus(action: IActionInstance, context: ITriggerContext): StatusStateDto;
    removeStatus(status: StatusStateDto, context: ITriggerContext): boolean;
}
//# sourceMappingURL=status-holder.interface.d.ts.map