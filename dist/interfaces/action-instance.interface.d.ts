import { StatusStateDto } from '../dto/states/status.state.dto';
import { ITriggerInstance } from './trigger-instance.interface';
import { IActionContext } from './action-context.interface';
import { IStackCounterInstance } from './stack-counter-instance.interface';
import { ActionStateDto } from '../dto/actions/action.dto';
export type IActionInstance = {
    get id(): string;
    get state(): ActionStateDto;
    triggers: ITriggerInstance[] | undefined;
    stacks: IStackCounterInstance | undefined;
    get statusEffect(): StatusStateDto | undefined;
    get debug(): boolean | undefined;
} & IActionContext;
//# sourceMappingURL=action-instance.interface.d.ts.map