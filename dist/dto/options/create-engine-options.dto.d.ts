import { IActor } from '../../interfaces/actor.interface';
import { IProgram } from '../../interfaces/program.interface';
import { IActionHandler } from '../../interfaces/action-handler.interface';
import { ITriggerHandler } from '../../interfaces/trigger-handler.interface';
import { DynamicContext } from 'ts-logic-framework';
export type CreateEngineOptionsDto = {
    globalContext?: DynamicContext;
    actors?: IActor[];
    programs?: IProgram[];
    actionHandlers: {
        [actionType: string]: IActionHandler;
    };
    triggerHandlers?: {
        [triggerType: string]: ITriggerHandler;
    };
};
//# sourceMappingURL=create-engine-options.dto.d.ts.map