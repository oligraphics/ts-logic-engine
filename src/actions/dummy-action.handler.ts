import { DummyActionDto } from '../dto/actions/dummy.action.dto';
import { DummyActionStateDto } from '../dto/states/dummy-action.state.dto';
import { TriggerContextDto } from '../dto/contexts/trigger.context.dto';
import { ActionHandler } from './action.handler';

export const DummyActionHandler =
  new (class DummyActionHandler extends ActionHandler<
    DummyActionDto,
    DummyActionStateDto
  > {
    tryRun(
      context: TriggerContextDto<DummyActionDto, DummyActionStateDto>,
    ): boolean {
      if (context.action.debug) {
        console.debug('Running dummy action', context.action.template);
      }
      return true;
    }
  })();
