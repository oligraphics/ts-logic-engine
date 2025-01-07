import { BuiltinActionTypeEnum } from '../../enums/builtin-action-type.enum';
import { ActionDto, ActionStateDto } from './action.dto';
import { Computable } from 'ts-logic-framework';
export type CompoundActionStateDto = {
    compound: Computable<string>[];
} & ActionStateDto;
export type CompoundActionDto = {
    type: BuiltinActionTypeEnum.COMPOUND;
    apply: CompoundActionStateDto;
} & ActionDto;
//# sourceMappingURL=compound.action.dto.d.ts.map