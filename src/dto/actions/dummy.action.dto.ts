import { GlobalActionTypeEnum } from '../../enums/global-action-type.enum';
import { ActionDto } from './action.dto';

export type DummyActionDto = {
  type: GlobalActionTypeEnum.DUMMY;
  apply: object;
} & ActionDto;
