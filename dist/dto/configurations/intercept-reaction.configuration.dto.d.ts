import { Computable } from 'ts-logic-framework';
export type InterceptReactionConfigurationDto = {
    change?: {
        [property: string]: Computable<unknown>;
    };
    params?: {
        [key: string]: Computable<unknown>;
    };
    action?: Computable<string>;
};
//# sourceMappingURL=intercept-reaction.configuration.dto.d.ts.map