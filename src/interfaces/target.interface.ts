import { IQueryable } from './queryable.interface';

export interface ITargetable extends IQueryable {
  get allowTargeting(): boolean;
}
