import { GlobalActionTypeEnum } from '../../enums/global-action-type.enum';
import { ActionDto } from './action.dto';

export type MessageActionDto = {
  type: GlobalActionTypeEnum.MESSAGE;
} & ActionDto;
