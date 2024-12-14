export interface IQueryable {
  getValue<T>(property: string, debug?: boolean): T;
}
