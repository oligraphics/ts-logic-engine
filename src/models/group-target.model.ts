import { ITargetable } from '../interfaces/target.interface';

export class GroupTarget implements ITargetable {
  readonly targets: ITargetable[];

  get allowTargeting() {
    return this.targets.some((t) => t.allowTargeting);
  }

  constructor(targets: ITargetable[]) {
    this.targets = targets;
  }
}
