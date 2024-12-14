import { ActionDto } from '../actions/action.dto';
import { EngineContextDto } from '../contexts/engine.context.dto';
import { IProgram } from '../../interfaces/program.interface';

export type ProgramDto = {
  id: string;
  main?: string;
  debug?: boolean;
  actions: {
    [id: string]: ActionDto;
  };
} & EngineContextDto &
  IProgram;
