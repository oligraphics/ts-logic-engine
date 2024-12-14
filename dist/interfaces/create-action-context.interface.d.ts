import { ActionDto } from '../dto/actions/action.dto';
import { ITargetable } from './target.interface';
import { IProgramContext } from './program-context.interface';
export type ICreateActionContext = {
    get actionId(): string;
    get action(): ActionDto;
    get target(): ITargetable;
} & IProgramContext;
//# sourceMappingURL=create-action-context.interface.d.ts.map