import { ActionStateDto } from '../actions/action.dto';

export type StatusStateDto = {
  persistent: boolean;
} & ActionStateDto;
