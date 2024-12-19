import { ActionStateDto } from '../action-states/action.state.dto';
import { ActionTriggerDto } from '../triggers/action.trigger.dto';
import { DynamicValue } from 'ts-logic-framework';
import { StackCounterDto } from '../stacks/stack-counter.dto';
export type ActionDto = {
    type: string;
    attachable?: boolean;
    properties?: {
        [key: string]: DynamicValue;
    };
    computed?: {
        [key: string]: DynamicValue;
    };
    target?: DynamicValue;
    triggers?: ActionTriggerDto[];
    apply: ActionStateDto;
    stacks?: StackCounterDto;
    out?: {
        [key: string]: DynamicValue;
    };
    next?: DynamicValue;
    debug?: boolean;
};
//# sourceMappingURL=action.dto.d.ts.map