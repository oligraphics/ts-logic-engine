import { ITargetable } from '../interfaces/target.interface';
import { DynamicContext } from 'ts-logic-framework';
import { ActionDto } from '../dto/actions/action.dto';
export declare const TargetService: {
    resolveTargets(action: ActionDto, context: DynamicContext, debug?: boolean): ITargetable[] | undefined;
};
//# sourceMappingURL=target.service.d.ts.map