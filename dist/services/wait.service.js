"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wait = void 0;
exports.Wait = new (class WaitService {
    async forSeconds(seconds) {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
})();
//# sourceMappingURL=wait.service.js.map