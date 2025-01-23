import { ActionDto } from './action.dto';
import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Computable } from 'ts-logic-framework';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';
export type RepeatActionStateDto = {
    repeat: Computable<number>;
    action: Computable<unknown>;
    params?: ParamsBlockConfigurationDto;
};
export type RepeatActionDto = {
    type: BuiltinActionTypeEnum.REPEAT;
    apply: RepeatActionStateDto;
} & ActionDto;
//# sourceMappingURL=repeat.action.dto.d.ts.map