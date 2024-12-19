import { EventPhaseEnum } from '../../enums/event-phase.enum';
import { Condition } from 'ts-logic-framework';

export type TriggerDto = {
  event: string;
  phase: EventPhaseEnum;
  recursive?: boolean;
  filter?: Condition;
  debug?: boolean;
};
