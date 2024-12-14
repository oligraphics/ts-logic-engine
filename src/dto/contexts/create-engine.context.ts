import { IActor } from '../../interfaces/actor.interface';
import { IProgram } from '../../interfaces/program.interface';
import { DynamicContext } from 'ts-logic-framework';

export type CreateEngineContextDto = {
  actors?: IActor[];
  programs?: IProgram[];
} & DynamicContext;
