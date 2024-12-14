import { ProgramDto } from '../programs/program.dto';
import { EngineContextDto } from './engine.context.dto';
import { IActor } from '../../interfaces/actor.interface';
export type ProgramContextDto = {
    /**
     * The initiator to say this program needs to be executed
     */
    initiator: IActor;
    /**
     * The one executing the program
     */
    source: IActor;
    /**
     * The program
     */
    program: ProgramDto;
} & EngineContextDto;
//# sourceMappingURL=program.context.dto.d.ts.map