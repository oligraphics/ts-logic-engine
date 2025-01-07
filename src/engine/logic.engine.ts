import { EventBus } from 'ts-event-bus';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ActionBuilderService } from '../services/action-builder.service';
import { ICreateActionContext } from '../interfaces/create-action-context.interface';
import { IActionContext } from '../interfaces/action-context.interface';
import { IProgram } from '../interfaces/program.interface';
import { IEngineContext } from '../interfaces/engine-context.interface';
import { CreateEngineOptionsDto } from '../dto/options/create-engine-options.dto';
import { IRunProgramContext } from '../interfaces/run-program-context.interface';
import { IActor } from '../interfaces/actor.interface';
import { DynamicContextService } from 'ts-logic-framework';
import { TargetService } from '../services/target.service';
import { ITargetable } from '../interfaces/target.interface';
import { EventDto } from '../dto/events/event.dto';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IEventSource } from '../interfaces/event-source.interface';
import { ProgramEventDto } from '../dto/events/program.event.dto';
import { BuiltinEventTypeEnum } from '../enums/builtin-event-type.enum';
import { ActionEventDto } from '../dto/events/action.event.dto';
import { EventSystem } from '../models/event-system.model';
import { ITriggerHandler } from '../interfaces/trigger-handler.interface';
import { BuiltinTriggerHandlers } from '../interfaces/builtin-trigger-handlers.interface';
import { ActionStateDto } from '../dto/actions/action.dto';

export class LogicEngine implements IActor {
  private readonly context: IEngineContext;
  private readonly program: IProgram | undefined;
  private readonly triggerHandlers: { [triggerType: string]: ITriggerHandler };
  private readonly actionHandlers: { [actionType: string]: IActionHandler };

  private readonly eventSystem: EventSystem;

  private _state: ActionStateDto | undefined = undefined;
  private _listeningStackActions: Map<string, IActionInstance> = new Map();
  private _listeningActions: Map<string, IActionInstance> = new Map();

  get id() {
    return '__root__';
  }

  get name() {
    return 'Root';
  }

  get state(): ActionStateDto | undefined {
    return this._state;
  }

  get allowTargeting(): boolean {
    return true;
  }

  get bus(): EventBus {
    return this.eventSystem.bus;
  }

  // noinspection JSUnusedGlobalSymbols
  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  constructor(program: IProgram | undefined, options: CreateEngineOptionsDto) {
    this.context = {
      ...(options.globalContext ?? {}),
      ...DynamicContextService.createContext({
        engine: this,
        actors: options.actors ?? [],
        programs: options.programs ?? [],
      }),
    };
    this.program = program;
    this.actionHandlers = options.actionHandlers;
    this.triggerHandlers = options.triggerHandlers ?? {
      ...BuiltinTriggerHandlers,
    };
    this.eventSystem = new EventSystem(this);
  }

  async start() {
    this.bus.trigger('start');
    if (this.program) {
      await this.tryRun({
        engine: this,
        ...DynamicContextService.createContext({
          program: this.program,
          actionId: this.program.main ?? 'main',
          initiator: this,
          source: this,
        }),
      });
    }
  }

  stop() {
    this.bus.trigger('stop');
  }

  getValue<T>(property: string, debug?: boolean): T {
    switch (property) {
      case 'state':
        return this.state as T;
      default:
        if (debug) {
          console.error(
            `Trying to read unknown property ${property} on LogicEngine`,
          );
        }
        return undefined as T;
    }
  }

  getActionHandler(actionType: string): IActionHandler | undefined {
    return this.actionHandlers[actionType];
  }

  update(deltaTime: number) {
    this.bus.trigger('update', deltaTime);
  }

  async tryRun(context: IRunProgramContext): Promise<boolean> {
    return await this.callEvent(
      context.source,
      <ProgramEventDto>{
        type: BuiltinEventTypeEnum.PROGRAM,
        engine: context.engine,
        program: context.program,
        initiator: context.initiator,
        source: context.source,
        params: context.params,
      },
      () =>
        this.run({
          ...this.context,
          ...DynamicContextService.createContext(
            {
              engine: context.engine,
              initiator: context.initiator,
              source: context.source,
              program: context.program,
              actionId: context.actionId,
            },
            context.params ?? {},
          ),
        }),
      context.program.debug,
    );
  }

  async run(context: IRunProgramContext): Promise<boolean> {
    const action = context.program.actions[context.actionId];
    if (!action) {
      console.error(
        'Action',
        context.actionId,
        'not found in program',
        context.program.id,
        '. Available:',
        ...Object.keys(context.program.actions),
      );
    }
    const actionContext = {
      ...context,
      ...DynamicContextService.createContext({
        action,
        ...(action.properties ?? {}),
        ...(action.computed ?? {}),
      }),
    };
    const targets: ITargetable[] = TargetService.resolveTargets(
      action,
      actionContext,
      context.program.debug || action.debug,
    ) ?? [context.source];
    if (targets.length === 0) {
      if (context.program.debug) {
        console.error(
          'Action',
          context.actionId,
          'in program',
          context.program.id,
          'provided no valid target.',
        );
      }
      return false;
    }
    for (const target of targets) {
      await this.apply({
        ...actionContext,
        ...DynamicContextService.createContext({
          target,
        }),
      });
    }
    return true;
  }

  apply(context: IActionContext) {
    const resolver = this.actionHandlers[context.action.type];
    if (!resolver) {
      throw new Error(
        `No action handler found for action of type ${
          context.action.type
        }\n${JSON.stringify(context.action, null, 2)}`,
      );
    }
    const createContext: ICreateActionContext = {
      ...context,
    };
    const instance: IActionInstance = ActionBuilderService.build(createContext);
    return this.callEvent(
      context.source,
      <ActionEventDto>{
        type: BuiltinEventTypeEnum.ACTION,
        action: instance,
        cancelable: true,
      },
      () => {
        return resolver.apply({
          ...createContext,
          ...DynamicContextService.createContext({
            engine: this,
            action: instance,
          }),
        });
      },
      context.action.debug,
    );
  }

  async callEvent<T extends EventDto>(
    source: IEventSource,
    event: T,
    perform?: (event: T) => Promise<boolean | void>,
    debug?: boolean,
  ): Promise<boolean> {
    return await this.eventSystem.callEvent(source, event, perform, debug);
  }

  async trigger(trigger: ITriggerInstance, event: EventDto) {
    const handler = this.triggerHandlers[trigger.type];
    if (!handler) {
      throw new Error(
        `No trigger handler found for trigger of type ${
          trigger.type
        }\n${JSON.stringify(trigger.action.action, null, 2)}`,
      );
    }
    await handler.handle(trigger, event);
  }

  remove(action: IActionInstance) {
    if (action.debug) {
      console.debug('Remove action', action.program.id, '>', action.actionId);
    }
    const handler = this.actionHandlers[action.action.type];
    if (!handler) {
      throw new Error(
        `No action handler found for action of type ${
          action.type
        }\n${JSON.stringify(action, null, 2)}`,
      );
    }
    handler.remove(action);
  }

  attachStack(action: IActionInstance) {
    if (action.debug) {
      console.debug(
        'Attach stack of action',
        action.program.id,
        '>',
        action.actionId,
      );
    }
    const stack = action.stacks;
    if (stack) {
      this.eventSystem.attachTriggers(stack.triggers);
    }
    this._listeningStackActions.set(action.id, action);
  }

  detachStack(action: IActionInstance) {
    if (action.debug) {
      console.debug(
        'Detach stack of action',
        action.program.id,
        '>',
        action.actionId,
      );
    }
    const stack = action.stacks;
    if (stack) {
      this.eventSystem.detachTriggers(stack.triggers);
    }
    this._listeningStackActions.delete(action.id);
  }

  attachTriggers(action: IActionInstance) {
    if (action.debug) {
      console.debug(
        'Attach triggers of action',
        action.program.id,
        '>',
        action.actionId,
      );
    }
    this._listeningActions.set(action.id, action);
    if (action.triggers) {
      this.eventSystem.attachTriggers(action.triggers);
    }
  }

  detachTriggers(action: IActionInstance) {
    if (action.debug) {
      console.debug(
        'Detach triggers of action',
        action.program.id,
        '>',
        action.actionId,
      );
    }
    this._listeningActions.delete(action.id);
    if (action.triggers) {
      this.eventSystem.detachTriggers(action.triggers);
    }
  }
}
