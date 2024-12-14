"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdService = void 0;
const node_crypto_1 = require("node:crypto");
exports.IdService = new (class IdService {
    createRandomId() {
        return (0, node_crypto_1.randomBytes)(8).toString('hex');
    }
})();
//# sourceMappingURL=id.service.js.map