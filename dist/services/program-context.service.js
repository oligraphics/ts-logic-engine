"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramContextService = void 0;
exports.ProgramContextService = new (class ProgramContextService {
    copy(context) {
        return {
            engine: context.engine,
            program: context.program,
            initiator: context.initiator,
            source: context.source,
        };
    }
})();
//# sourceMappingURL=program-context.service.js.map