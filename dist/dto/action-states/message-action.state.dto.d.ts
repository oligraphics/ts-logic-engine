import { ActionStateDto } from './action.state.dto';
import { DynamicValue } from 'ts-logic-framework';
export type MessageActionStateDto = {
    message: DynamicValue;
    variables?: {
        [key: string]: DynamicValue;
    };
    data?: {
        [key: string]: DynamicValue;
    };
} & ActionStateDto;
//# sourceMappingURL=message-action.state.dto.d.ts.map