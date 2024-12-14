import { LogicEngine } from '../engine/logic.engine';
import { DynamicContext } from 'ts-logic-framework';

export type IEngineContext = {
  get engine(): LogicEngine;
} & DynamicContext;
