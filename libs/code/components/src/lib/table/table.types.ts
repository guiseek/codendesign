export type CodeTableExtraColumn = 'select' | 'options' | 'actions';

export type CodeTableColumns<T> = Array<keyof T | CodeTableExtraColumn>;

export interface CodeRowClicked<T  =any> {
  origin: string;
  data: T
}
