import { randomBytes } from 'node:crypto';

export const IdService = new (class IdService {
  createRandomId() {
    return randomBytes(8).toString('hex');
  }
})();
