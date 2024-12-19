import { CounterMethodEnum } from '../enums/counter-method.enum';

export const CounterMethodService = new (class CounterMethodService {
  getChangedValue(value: number, method: CounterMethodEnum, amount: number) {
    switch (method) {
      case CounterMethodEnum.INCREASE:
        return value + amount;
      case CounterMethodEnum.REDUCE:
        return value - amount;
      case CounterMethodEnum.SET:
        return amount;
      case CounterMethodEnum.REMOVE:
        return 0;
    }
  }
})();
