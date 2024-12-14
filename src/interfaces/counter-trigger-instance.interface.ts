import { ITriggerInstance } from './trigger-instance.interface';
import { CounterMethodEnum } from '../enums/counter-method.enum';

export type ICounterTriggerInstance = {
  type: CounterMethodEnum;
  amount: number;
} & ITriggerInstance;
