import { TriggerDto } from './trigger.dto';
import { Computable } from 'ts-logic-framework';
import { CounterMethodEnum } from '../../enums/counter-method.enum';

export type CounterTriggerDto = {
  method?: Computable<CounterMethodEnum>;
  amount?: Computable<number>;
} & TriggerDto;
