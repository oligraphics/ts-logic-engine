import { IProgramContext } from '../interfaces/program-context.interface';

export const ProgramContextService = new (class ProgramContextService {
  copy(context: IProgramContext): IProgramContext {
    return {
      engine: context.engine,
      program: context.program,
      initiator: context.initiator,
      source: context.source,
    };
  }
})();
