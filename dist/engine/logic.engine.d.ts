import { EventBus } from 'ts-event-bus';
import { ActionStateDto } from '../dto/action-states/action.state.dto';
import { IActionHandler } from '../interfaces/action-handler.interface';
import { IActionInstance } from '../interfaces/action-instance.interface';
import { IActionContext } from '../interfaces/action-context.interface';
import { IProgram } from '../interfaces/program.interface';
import { CreateEngineContextDto } from '../dto/contexts/create-engine.context.dto';
import { IRunProgramContext } from '../interfaces/run-program-context.interface';
import { IActor } from '../interfaces/actor.interface';
import { EventDto } from '../dto/events/event.dto';
import { ITriggerInstance } from '../interfaces/trigger-instance.interface';
import { IEventSource } from '../interfaces/event-source.interface';
import { ITriggerHandler } from '../interfaces/trigger-handler.interface';
export declare class LogicEngine implements IActor {
    private readonly context;
    private readonly program;
    private readonly triggerHandlers;
    private readonly actionHandlers;
    private readonly eventSystem;
    private _state;
    private _listeningStackActions;
    private _listeningActions;
    get id(): string;
    get name(): string;
    get state(): ActionStateDto | undefined;
    get allowTargeting(): boolean;
    get bus(): EventBus;
    toJSON(): {
        id: string;
        name: string;
    };
    constructor(program: IProgram | undefined, context: CreateEngineContextDto, actionHandlers: {
        [actionType: string]: IActionHandler;
    }, triggerHandlers?: {
        [triggerType: string]: ITriggerHandler;
    });
    start(): Promise<void>;
    stop(): void;
    getValue<T>(property: string, debug?: boolean): T;
    getActionHandler(actionType: string): IActionHandler | undefined;
    update(deltaTime: number): void;
    tryRun(context: IRunProgramContext): Promise<boolean>;
    run(context: IRunProgramContext): Promise<boolean>;
    apply(context: IActionContext): Promise<boolean>;
    callEvent<T extends EventDto>(source: IEventSource, event: T, perform?: (event: T) => Promise<boolean>): Promise<boolean>;
    trigger(trigger: ITriggerInstance, event: EventDto): Promise<void>;
    remove(action: IActionInstance): void;
    attachStack(action: IActionInstance): void;
    detachStack(action: IActionInstance): void;
    attachTriggers(action: IActionInstance): void;
    detachTriggers(action: IActionInstance): void;
}
//# sourceMappingURL=logic.engine.d.ts.map