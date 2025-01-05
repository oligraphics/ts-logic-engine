import {
  BuiltinActionHandlers,
  IActionHandler,
  IProgram,
  LogicEngine,
} from '../../src';
import { readFileSync } from 'fs';
import { join } from 'node:path';
import { MessageEventDto } from '../../src';
import { BuiltinEventTypeEnum } from '../../src';

// Load a program
const program: IProgram = JSON.parse(
  readFileSync(join(__dirname, '../files/triggers.json')).toString('utf-8'),
);

// Create action handlers map
const actionHandlers: { [actionType: string]: IActionHandler } = {
  ...BuiltinActionHandlers,
  // Add custom resolvers here
};

// Create the engine
const engine = new LogicEngine(program, {
  actionHandlers,
});
// Demonstrate that you can listen to engine events from outside
engine.bus.on(BuiltinEventTypeEnum.MESSAGE, (event) =>
  console.log(
    'Message:',
    (<MessageEventDto>event).message,
    'Data:',
    (<MessageEventDto>event).data,
  ),
);
// Start the engine
engine
  .start()
  .then(() => console.log('Done!'))
  .catch(console.error);
