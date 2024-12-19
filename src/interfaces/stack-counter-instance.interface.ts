import { ICounterInstance } from './counter-instance.interface';

export type IStackCounterInstance = ICounterInstance & {
  get persistent(): boolean;
};
