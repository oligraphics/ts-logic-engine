import { ProgramContextDto } from './program.context.dto';

export type RunProgramContextDto = {
  actionId: string;
  arguments: { [key: string]: unknown };
} & ProgramContextDto;
