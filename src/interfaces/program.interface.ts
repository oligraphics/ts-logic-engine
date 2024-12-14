import { ActionDto } from '../dto/actions/action.dto';

export interface IProgram {
  get id(): string;
  get actions(): { [id: string]: ActionDto };

  /**
   * @default "main"
   */
  main?: string;
  debug?: boolean;
}
