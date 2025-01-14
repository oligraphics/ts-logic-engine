"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicBehaviour = void 0;
const ts_state_machines_1 = require("ts-state-machines");
class LogicBehaviour extends ts_state_machines_1.Behaviour {
    engine;
    completionListener;
    constructor(engine) {
        super();
        this.engine = engine;
        this.completionListener = async () => this.complete();
        this.engine.bus.on('stop', this.completionListener);
    }
    async initialize() {
        await this.engine.start();
    }
    update(deltaTime) {
        this.engine.update(deltaTime);
    }
    onComplete() {
        this.engine.bus.off('stop', this.completionListener);
    }
}
exports.LogicBehaviour = LogicBehaviour;
//# sourceMappingURL=logic.behaviour.js.map