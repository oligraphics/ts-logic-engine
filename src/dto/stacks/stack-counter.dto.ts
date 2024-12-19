import { CounterDto } from '../counters/counter.dto';

export type StackCounterDto = {
  persistent: boolean;
} & CounterDto;
