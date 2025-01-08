import { ActionHandler } from './action.handler';
import {
  ProgramActionDto,
  ProgramActionStateDto,
} from '../../dto/actions/program.action.dto';
import { TriggerContextDto } from '../../dto/contexts/trigger.context.dto';
import { LogicService } from 'ts-logic-framework';
import { ParamsService } from '../../services/params.service';
import { IActor } from '../../interfaces/actor.interface';

export const ProgramActionHandler =
  new (class ProgramActionHandler extends ActionHandler<
    ProgramActionDto,
    ProgramActionStateDto
  > {
    async tryRun(
      context: TriggerContextDto<ProgramActionDto, ProgramActionStateDto>,
    ): Promise<boolean> {
      const { action } = context;
      const { state, debug } = action;

      if (debug) {
        console.debug('Run program action', action.action);
      }

      const programId = LogicService.resolve<string>(
        state.program,
        context,
        debug,
      );
      if (!programId) {
        if (debug) {
          console.error(
            'Program action returned no program id:',
            action.action,
          );
        }
        return false;
      }

      const program = action.engine.programs.find((p) => p.id === programId);
      if (!program) {
        if (debug) {
          console.error(
            'Program action references unknown program:',
            programId,
            'action:',
            action.action,
          );
        }
        return false;
      }
      const actionId =
        LogicService.resolve<string>(state.action, context, debug) ?? 'main';
      const params = state.params
        ? ParamsService.resolve(state.params, context, debug)
        : undefined;
      if (debug) {
        console.debug(
          'Run program from action',
          program.id,
          '>',
          actionId,
          'params:',
          params,
        );
      }
      return await action.engine.tryRun({
        engine: action.engine,
        initiator: action.initiator,
        source: (action.target as IActor)?.id
          ? (action.target as IActor)
          : action.source,
        program,
        actionId,
        params,
      });
    }
  })();
