import { ActionDto } from '../dto/actions/action.dto';
import { DynamicContext } from 'ts-logic-framework';
export interface IProgram {
    get id(): string;
    get actions(): {
        [id: string]: ActionDto;
    };
    context?: DynamicContext;
    /**
     * @default "main"
     */
    main?: string;
    debug?: boolean;
}
//# sourceMappingURL=program.interface.d.ts.map