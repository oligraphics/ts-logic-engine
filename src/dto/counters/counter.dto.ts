import { CounterTriggerDto } from '../triggers/counter.trigger.dto';

export type CounterDto = {
  value: number;
  triggers?: CounterTriggerDto[];
};
