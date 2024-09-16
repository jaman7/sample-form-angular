import { DocOpenTypes } from '@app/shared/types/doc-types';

export type OperationButtonTypes = 'ADD' | 'SHOW' | 'EDIT' | 'DELETE';

export type ColumnType = 'Boolean' | 'Text' | 'Controls';

export interface ITableColumn {
  id?: number;
  header?: string;
  customHeader?: string;
  field?: string;
  sortField?: string;
  type?: ColumnType;
  translateKey?: string;
  sortable?: boolean;
  customClass?: string;
  customizeValue?(any?: any): void;
  visible?: boolean;
}

export interface IRowSelected {
  row?: unknown;
  openType?: DocOpenTypes | OperationButtonTypes;
  id?: number;
}
