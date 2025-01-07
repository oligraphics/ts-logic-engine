export enum CounterMethodEnum {
  /**
   * Sets the amount<br />
   * <code>x = value</code>
   */
  SET = 'set',
  /**
   * Adds an amount<br />
   * <code>x = x + value</code>
   */
  INCREASE = 'increase',
  /**
   * Deducts an amount<br />
   * <code>x = x - value</code>
   */
  REDUCE = 'reduce',
  /**
   * Removes the counter<br />
   * <code>x = 0</code>
   *
   */
  REMOVE = 'remove',
}
