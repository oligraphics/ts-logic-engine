import {
  BuiltinActionHandlers,
  BuiltinActionTypeEnum,
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
  readFileSync(join(__dirname, '../files/schedule.json')).toString('utf-8'),
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
const startTime = Date.now();
engine.bus.on(BuiltinEventTypeEnum.MESSAGE, async (event) =>
  console.log(
    'Time:',
    Date.now() - startTime + 'ms',
    'Message:',
    (<MessageEventDto>event).message,
    'Data:',
    (<MessageEventDto>event).data,
  ),
);
// Start the engine
engine
  .start()
  .then(() =>
    console.log('Time:', Date.now() - startTime + 'ms', 'Engine started!'),
  )
  .catch(console.error);

// Run a clock
const framerate = 60;
const tickLength = 1000 / framerate;
let lastUpdate = Date.now();
const tick = () => {
  const time = Date.now();
  engine.update(time - lastUpdate);
  lastUpdate = time;
  setTimeout(() => tick(), tickLength);
};
tick();

setTimeout(() => {
  console.log('Run the schedule a second time.');
  engine
    .tryRun({
      engine,
      program,
      actionId: 'main',
      source: engine,
      initiator: engine,
    })
    .catch(console.error);
}, 6000);
