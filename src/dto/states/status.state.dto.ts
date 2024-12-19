import { ActionStateDto } from '../action-states/action.state.dto';

export type StatusStateDto = {
  persistent: boolean;
} & ActionStateDto;
