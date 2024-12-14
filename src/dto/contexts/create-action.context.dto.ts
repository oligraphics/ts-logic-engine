import { ActionDto } from '../actions/action.dto';
import { ITargetable } from '../../interfaces/target.interface';
import { ProgramContextDto } from './program.context.dto';

export type CreateActionContextDto<TAction extends ActionDto> = {
  action: TAction;
  target: ITargetable;
} & ProgramContextDto;
