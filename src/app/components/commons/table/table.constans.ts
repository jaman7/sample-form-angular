import { ITableColumn } from './table.models';

export const ActionColumnDef: ITableColumn = {
  id: 0,
  type: 'Text',
  header: 'common.table.operations',
  field: 'operations',
  sortField: 'operations',
  sortable: true,
  visible: true,
};
