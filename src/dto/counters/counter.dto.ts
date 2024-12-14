import { CounterTriggerDto } from '../triggers/counter.trigger.dto';

export type CounterDto = {
  counter: number;
  triggers?: CounterTriggerDto[];
};
