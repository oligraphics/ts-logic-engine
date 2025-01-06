"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupTarget = void 0;
class GroupTarget {
    targets;
    get allowTargeting() {
        return this.targets.some((t) => t.allowTargeting);
    }
    constructor(targets) {
        this.targets = targets;
    }
}
exports.GroupTarget = GroupTarget;
//# sourceMappingURL=group-target.model.js.map