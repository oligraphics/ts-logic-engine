import { IProgramContext } from './program-context.interface';

export type IRunProgramContext = {
  get actionId(): string;
  params?: { [key: string]: unknown } | undefined;
} & IProgramContext;
