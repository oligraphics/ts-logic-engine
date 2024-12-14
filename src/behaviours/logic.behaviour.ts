import { Behaviour } from 'ts-state-machines';
import { LogicEngine } from '../engine/logic.engine';

export class LogicBehaviour extends Behaviour {
  private readonly engine: LogicEngine;
  private readonly completionListener: () => void;

  constructor(engine: LogicEngine) {
    super();
    this.engine = engine;
    this.completionListener = () => this.complete();
    this.engine.bus.on('stop', () => this.completionListener);
  }

  initialize() {
    this.engine.start();
  }

  update(deltaTime: number) {
    this.engine.update(deltaTime);
  }

  onComplete() {
    this.engine.bus.off('stop', this.completionListener);
  }
}
