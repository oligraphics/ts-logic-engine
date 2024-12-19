"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionContextService = void 0;
exports.ActionContextService = new (class ActionContextService {
    copy(context) {
        return {
            actionId: context.actionId,
            action: context.action,
            engine: context.engine,
            program: context.program,
            initiator: context.initiator,
            source: context.source,
            target: context.target,
        };
    }
})();
//# sourceMappingURL=action-context.service.js.map