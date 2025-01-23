import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { Computable } from 'ts-logic-framework';
import { ActionDto, ActionStateDto } from './action.dto';
import { ParamsBlockConfigurationDto } from '../configurations/params-block.configuration.dto';
export type ProgramActionStateDto = {
    program: Computable<string>;
    action?: Computable<string>;
    params: ParamsBlockConfigurationDto;
} & ActionStateDto;
export type ProgramActionDto = {
    type: BuiltinActionTypeEnum.PROGRAM;
    apply: ProgramActionStateDto;
} & ActionDto;
//# sourceMappingURL=program.action.dto.d.ts.map