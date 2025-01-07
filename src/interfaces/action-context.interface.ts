import { ActionDto } from '../dto/actions/action.dto';
import { ITargetable } from './target.interface';
import { IProgramContext } from './program-context.interface';

export type IActionContext = {
  /**
   * The static id of the action within the program. These ids
   * are used for actions to trigger each other.
   */
  get actionId(): string;
  /**
   * The current action
   */
  get action(): ActionDto;
  /**
   * The target of the action
   */
  get target(): ITargetable;
  /**
   * Action params
   */
  get params(): { [key: string]: unknown };
} & IProgramContext;
