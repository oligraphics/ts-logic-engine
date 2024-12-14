import {
  BuiltinActionHandlers,
  IActionHandler,
  IProgram,
  LogicEngine,
} from '../../src';
import { readFileSync } from 'fs';
import { join } from 'node:path';
import { DynamicContext } from 'ts-logic-framework';

const context: DynamicContext = {};

const program: IProgram = JSON.parse(
  readFileSync(join(__dirname, '../files/hello-world.json')).toString('utf-8'),
);

const resolvers: { [actionType: string]: IActionHandler } = {
  ...BuiltinActionHandlers,
};

const engine = new LogicEngine(program, context, resolvers);
engine.start();
