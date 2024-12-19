import { DynamicValue } from 'ts-logic-framework';
export type InterceptReactionConfigurationDto = {
    change?: {
        [property: string]: DynamicValue;
    };
    params?: {
        [key: string]: DynamicValue;
    };
    action?: DynamicValue;
};
//# sourceMappingURL=intercept-reaction.configuration.dto.d.ts.map