import { ProgramContextDto } from './program.context.dto';
export type RunProgramContextDto = {
    actionId: string;
    arguments: {
        [key: string]: unknown;
    };
} & ProgramContextDto;
//# sourceMappingURL=run-program.context.dto.d.ts.map