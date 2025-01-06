import { ITargetable } from '../interfaces/target.interface';
export declare class GroupTarget implements ITargetable {
    readonly targets: ITargetable[];
    get allowTargeting(): boolean;
    constructor(targets: ITargetable[]);
}
//# sourceMappingURL=group-target.model.d.ts.map