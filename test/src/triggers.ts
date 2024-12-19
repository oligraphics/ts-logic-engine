import {
  BuiltinActionHandlers,
  IActionHandler,
  IProgram,
  LogicEngine,
} from '../../src';
import { readFileSync } from 'fs';
import { join } from 'node:path';
import { DynamicContext, DynamicContextService } from 'ts-logic-framework';
import { MessageEventDto } from '../../src/dto/events/message.event.dto';
import { BuiltinEventTypeEnum } from '../../src/enums/builtin-event-type.enum';

// You could add global properties here
const context: DynamicContext = DynamicContextService.createContext({});

// Load a program
const program: IProgram = JSON.parse(
  readFileSync(join(__dirname, '../files/triggers.json')).toString('utf-8'),
);

// Create resolvers map
const resolvers: { [actionType: string]: IActionHandler } = {
  ...BuiltinActionHandlers,
  // Add custom resolvers here
};

// Create the engine
const engine = new LogicEngine(program, context, resolvers);
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
engine.start();
