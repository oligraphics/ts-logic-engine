import { ITriggerInstance } from '../../interfaces/trigger-instance.interface';
import { ITriggerHandler } from '../../interfaces/trigger-handler.interface';
import { EventDto } from '../../dto/events/event.dto';

export abstract class TriggerHandler<TTrigger extends ITriggerInstance>
  implements ITriggerHandler
{
  abstract handle(trigger: TTrigger, event: EventDto): Promise<void>;
}
