import { LogicEngine } from '../engine/logic.engine';

export type IEngineContext = {
  get engine(): LogicEngine;
};
