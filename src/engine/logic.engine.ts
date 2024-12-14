import { EventBus } from 'ts-event-bus';
import { ActionStateDto } from '../dto/states/action.state.dto';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { ActionBuilderService } from '../services/action-builder.service';
import { ICreateActionContext } from '../interfaces/create-action-context.interface';
import { IActionContext } from '../interfaces/action-context.interface';
import { IProgram } from '../interfaces/program.interface';
import { IEngineContext } from '../interfaces/engine-context.interface';
import { CreateEngineContextDto } from '../dto/contexts/create-engine.context';
import { IRunProgramContext } from '../interfaces/run-program-context.interface';
import { IActor } from '../interfaces/actor.interface';
import { ConditionService, DynamicContextService } from 'ts-logic-framework';
import { TargetService } from '../services/target.service';
import { ITargetable } from '../interfaces/target.interface';
import { EventPhaseEnum } from '../enums/event-phase.enum';
import { EventDto } from '../dto/events/event.dto';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IEventSource } from '../interfaces/event-source.interface';
import { ProgramEventDto } from '../dto/events/program.event.dto';
import { BuiltinEventTypeEnum } from '../enums/builtin-event-type.enum';
import { ActionEventDto } from '../dto/events/action.event.dto';

export class LogicEngine implements IActor {
  private readonly context: IEngineContext;
  private readonly program: IProgram;
  private readonly actionResolvers: { [actionType: string]: IActionHandler };

  private readonly eventSystem: EventSystem;

  private _state: ActionStateDto | undefined = undefined;
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

  constructor(
    program: IProgram,
    context: CreateEngineContextDto,
    actionResolvers: { [actionType: string]: IActionHandler },
  ) {
    this.context = {
      engine: this,
      actors: context.actors ?? [],
      programs: context.programs ?? [],
    };
    this.program = program;
    this.actionResolvers = actionResolvers;
    this.eventSystem = new EventSystem(this);
  }

  start() {
    this.bus.trigger('start');
    this.tryRun({
      ...this.context,
      ...DynamicContextService.createContext({
        program: this.program,
        actionId: this.program.main ?? 'main',
        initiator: this,
        source: this,
      }),
    });
  }

  update(deltaTime: number) {
    this.bus.trigger('update', deltaTime);
  }

  tryRun(context: IRunProgramContext): boolean {
    return this.callEvent(
      context.source,
      <ProgramEventDto>{
        type: BuiltinEventTypeEnum.PROGRAM,
        engine: context.engine,
        program: context.program,
        initiator: context.initiator,
        source: context.source,
      },
      () => this.run(context),
    );
  }

  run(context: IRunProgramContext): boolean {
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
    const targets: ITargetable[] = action.target
      ? TargetService.resolveTargets(
          action.target,
          {
            ...context,
            ...DynamicContextService.createContext({
              action,
            }),
          },
          context.program.debug || action.debug,
        )
      : [context.source];
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
      this.apply({
        ...context,
        ...DynamicContextService.createContext({
          target,
          action,
        }),
      });
    }
    return true;
  }

  apply(context: IActionContext) {
    const resolver = this.actionResolvers[context.action.type];
    if (!resolver) {
      throw new Error(
        `No resolver found for action of type ${
          context.action.type
        }\n${JSON.stringify(context.action, null, 2)}`,
      );
    }
    const createContext: ICreateActionContext = {
      ...context,
      ...DynamicContextService.createContext({
        ...(context.action.properties ?? {}),
        ...(context.action.computed ?? {}),
      }),
    };
    const instance: IActionInstance = ActionBuilderService.build(createContext);
    return this.callEvent(
      context.source,
      <ActionEventDto>{
        type: BuiltinEventTypeEnum.ACTION,
        action: instance,
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
    );
  }

  stop() {
    this.bus.trigger('stop');
  }

  get allowTargeting(): boolean {
    return true;
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

  callEvent<T extends EventDto>(
    source: IEventSource,
    event: T,
    perform?: (event: T) => boolean,
  ): boolean {
    return this.eventSystem.callEvent(source, event, perform);
  }

  trigger<T extends EventDto>(trigger: ITriggerInstance, event: T) {
    const handler = this.actionResolvers[trigger.action.action.type];
    if (!handler) {
      throw new Error(
        `No resolver found for action of type ${
          trigger.action.action.type
        }\n${JSON.stringify(trigger.action.action, null, 2)}`,
      );
    }
    handler.trigger({
      trigger,
      event,
      action: trigger.action,
    });
  }

  attachTriggers(action: IActionInstance) {
    this._listeningActions.set(action.id, action);
    if (action.triggers) {
      this.eventSystem.attachTriggers(action.triggers);
    }
  }

  detachTriggers(action: IActionInstance) {
    this._listeningActions.delete(action.id);
    if (action.triggers) {
      this.eventSystem.detachTriggers(action.triggers);
    }
  }
}

type EventListeners = Map<string, PhaseListeners>;
type PhaseListeners = Map<string, ITriggerInstance>;

class EventSystem {
  readonly bus: EventBus = new EventBus();
  readonly engine: LogicEngine;

  private readonly listeners = new Map<string, EventListeners>();

  constructor(engine: LogicEngine) {
    this.engine = engine;
  }

  callEvent<T extends EventDto>(
    source: IEventSource,
    event: T,
    perform?: (event: T) => boolean,
  ): boolean {
    const eventListeners = this.listeners.get(event.type);
    if (!eventListeners) {
      if (perform && !perform(event)) {
        return false;
      }
      this.bus.trigger(event.type, event);
      return true;
    }
    if (!this._callPhase(eventListeners, source, event, EventPhaseEnum.ALLOW)) {
      return false;
    }
    if (
      !this._callPhase(eventListeners, source, event, EventPhaseEnum.PREPARE)
    ) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (
      !this._callPhase(eventListeners, source, event, EventPhaseEnum.PERFORM)
    ) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    if (perform && !perform(event)) {
      this._callCanceled(eventListeners, source, event);
      return false;
    }
    this.bus.trigger(event.type, event);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.PERFORMED);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
    return true;
  }

  _callCanceled(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
  ) {
    this._callPhase(eventListeners, source, event, EventPhaseEnum.CANCELED);
    this._callPhase(eventListeners, source, event, EventPhaseEnum.AFTER);
  }

  _callPhase(
    eventListeners: EventListeners,
    source: IEventSource,
    event: EventDto,
    phase: EventPhaseEnum,
  ): boolean {
    const phaseListeners = eventListeners.get(phase);
    if (!phaseListeners) {
      return !event.cancelable || !event.canceled;
    }
    const context = DynamicContextService.createContext({
      source,
      event,
      phase,
    });
    for (const listener of phaseListeners.values()) {
      const filterResult = listener.filter
        ? ConditionService.testCondition(listener.filter, context)
        : true;
      if (filterResult !== true) {
        if (listener.debug) {
          console.log(
            'Filter no match:',
            listener.action.program.id,
            '>',
            listener.action.actionId,
            filterResult,
          );
        }
        continue;
      }

      try {
        listener.action.engine.trigger(listener, event);
      } catch (e) {
        console.error(e);
      }

      if (event.cancelable && event.canceled) {
        return false;
      }
    }

    return !event.cancelable || !event.canceled;
  }

  attachTriggers(triggers: ITriggerInstance[]) {
    for (const trigger of triggers) {
      const eventListeners =
        this.listeners.get(trigger.event) ?? new Map<string, PhaseListeners>();
      const phaseListeners =
        eventListeners.get(trigger.phase) ??
        new Map<string, ITriggerInstance>();
      phaseListeners.set(trigger.id, trigger);
      eventListeners.set(trigger.phase, phaseListeners);
      this.listeners.set(trigger.event, eventListeners);
    }
  }

  detachTriggers(triggers: ITriggerInstance[]) {
    for (const trigger of triggers) {
      const eventListeners = this.listeners.get(trigger.event);
      if (eventListeners) {
        const phaseListeners = eventListeners.get(trigger.phase);
        if (phaseListeners) {
          phaseListeners.delete(trigger.id);
        }
      }
    }
  }
}
