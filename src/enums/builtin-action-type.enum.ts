export enum BuiltinActionTypeEnum {
  /**
   * Run multiple actions in sequence
   */
  COMPOUND = 'compound',
  /**
   * Run one of two actions based on a condition
   */
  CONDITION = 'condition',
  /**
   * Empty action without any own behaviour
   */
  DUMMY = 'dummy',
  /**
   * Action which can react to and modify events
   */
  INTERCEPT = 'intercept',
  /**
   * Action which sends a message event
   */
  MESSAGE = 'message',
  /**
   * Run a different program
   */
  PROGRAM = 'program',
  /**
   * Action which can repeat other actions after they are performed
   */
  REPEAT = 'repeat',
}
