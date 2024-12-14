import { IEngineContext } from './engine-context.interface';
import { IProgram } from './program.interface';
import { IActor } from './actor.interface';

export type IProgramContext = {
  get program(): IProgram;
  get initiator(): IActor;
  get source(): IActor;
} & IEngineContext;
