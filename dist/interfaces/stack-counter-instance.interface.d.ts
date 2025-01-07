import { ICounterInstance } from './counter-instance.interface';
import { Computable } from 'ts-logic-framework';
export type IStackCounterInstance = ICounterInstance & {
    get persistent(): boolean;
    after?: {
        params?: {
            [key: string]: unknown;
        };
        next: Computable<string>;
    };
};
//# sourceMappingURL=stack-counter-instance.interface.d.ts.map