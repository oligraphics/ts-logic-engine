import { ActionStateDto } from './action.state.dto';

export type StatusStateDto = {
  persistent: boolean;
} & ActionStateDto;
