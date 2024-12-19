import { IEngineContext } from '../interfaces/engine-context.interface';

export const EngineContextService = new (class EngineContextService {
  copy(context: IEngineContext): IEngineContext {
    return {
      engine: context.engine,
    };
  }
})();
