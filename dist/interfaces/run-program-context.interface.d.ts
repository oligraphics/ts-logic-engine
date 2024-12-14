import { IProgramContext } from './program-context.interface';
export type IRunProgramContext = {
    get actionId(): string;
    arguments?: {
        [key: string]: unknown;
    } | undefined;
} & IProgramContext;
//# sourceMappingURL=run-program-context.interface.d.ts.map