import { EventBus } from 'ts-event-bus';
import { ActionStateDto } from '../dto/states/action.state.dto';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { IActionContext } from '../interfaces/action-context.interface';
import { IProgram } from '../interfaces/program.interface';
import { CreateEngineContextDto } from '../dto/contexts/create-engine.context';
import { IRunProgramContext } from '../interfaces/run-program-context.interface';
import { IActor } from '../interfaces/actor.interface';
import { EventDto } from '../dto/events/event.dto';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IEventSource } from '../interfaces/event-source.interface';
export declare class LogicEngine implements IActor {
    private readonly context;
    private readonly program;
    private readonly actionResolvers;
    private readonly eventSystem;
    private _state;
    private _listeningActions;
    get id(): string;
    get name(): string;
    get state(): ActionStateDto | undefined;
    get bus(): EventBus;
    toJSON(): {
        id: string;
        name: string;
    };
    constructor(program: IProgram, context: CreateEngineContextDto, actionResolvers: {
        [actionType: string]: IActionHandler;
    });
    start(): void;
    update(deltaTime: number): void;
    tryRun(context: IRunProgramContext): boolean;
    run(context: IRunProgramContext): boolean;
    apply(context: IActionContext): boolean;
    stop(): void;
    get allowTargeting(): boolean;
    getValue<T>(property: string, debug?: boolean): T;
    callEvent<T extends EventDto>(source: IEventSource, event: T, perform?: (event: T) => boolean): boolean;
    trigger<T extends EventDto>(trigger: ITriggerInstance, event: T): void;
    attachTriggers(action: IActionInstance): void;
    detachTriggers(action: IActionInstance): void;
}
//# sourceMappingURL=logic.engine.d.ts.map