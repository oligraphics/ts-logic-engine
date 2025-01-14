import { Behaviour } from 'ts-state-machines';
import { LogicEngine } from '../engine/logic.engine';

export class LogicBehaviour extends Behaviour {
  private readonly engine: LogicEngine;
  private readonly completionListener: () => Promise<void>;

  constructor(engine: LogicEngine) {
    super();
    this.engine = engine;
    this.completionListener = async () => this.complete();
    this.engine.bus.on('stop', this.completionListener);
  }

  async initialize() {
    await this.engine.start();
  }

  update(deltaTime: number) {
    this.engine.update(deltaTime);
  }

  onComplete() {
    this.engine.bus.off('stop', this.completionListener);
  }
}
