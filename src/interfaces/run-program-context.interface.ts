import { IProgramContext } from './program-context.interface';

export type IRunProgramContext = {
  get actionId(): string;
  arguments?: { [key: string]: unknown } | undefined;
} & IProgramContext;
