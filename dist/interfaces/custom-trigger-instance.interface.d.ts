import { EventDto } from '../dto/events/event.dto';
import { ITriggerInstance } from './trigger-instance.interface';
export type ICustomTriggerInstance = {
    trigger: (event: EventDto) => Promise<void> | void;
} & ITriggerInstance;
//# sourceMappingURL=custom-trigger-instance.interface.d.ts.map