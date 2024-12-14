import { Behaviour } from 'ts-state-machines';
import { LogicEngine } from '../engine/logic.engine';
export declare class LogicBehaviour extends Behaviour {
    private readonly engine;
    private readonly completionListener;
    constructor(engine: LogicEngine);
    initialize(): void;
    update(deltaTime: number): void;
    onComplete(): void;
}
//# sourceMappingURL=logic.behaviour.d.ts.map