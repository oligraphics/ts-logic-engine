import { LogicEngine } from '../../engine/logic.engine';
import { IEngineContext } from '../../interfaces/engine-context.interface';
import { IActor } from '../../interfaces/actor.interface';
import { IProgram } from '../../interfaces/program.interface';
import { DynamicContext } from 'ts-logic-framework';
export type EngineContextDto = {
    /**
     * The current logic engine
     */
    engine: LogicEngine;
    actors: IActor[];
    programs: IProgram[];
} & DynamicContext & IEngineContext;
//# sourceMappingURL=engine.context.dto.d.ts.map