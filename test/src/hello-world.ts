import {
  BuiltinActionHandlers,
  BuiltinEventTypeEnum,
  IActionHandler,
  IProgram,
  LogicEngine,
  MessageEventDto,
} from '../../src';
import { readFileSync } from 'fs';
import { join } from 'node:path';

const program: IProgram = JSON.parse(
  readFileSync(join(__dirname, '../files/hello-world.json')).toString('utf-8'),
);

const actionHandlers: { [actionType: string]: IActionHandler } = {
  ...BuiltinActionHandlers,
};

const engine = new LogicEngine(program, {
  actionHandlers,
});
engine.bus.on(
  BuiltinEventTypeEnum.MESSAGE,
  (event: MessageEventDto | undefined) => console.log(event?.message),
);
engine
  .start()
  .then(() => console.log('Done!'))
  .catch(console.error);
