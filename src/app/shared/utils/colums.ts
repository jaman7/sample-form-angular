import { ColumnType, ITableColumn } from '@app/components/commons/table/table.models';

export function setColumnsConfig(
  config,
  params: {
    prefix?: string;
  } = {}
): ITableColumn[] {
  const { prefix } = params;
  return Object.keys(config).map((key, i) => {
    const { type: colType, sortField, sortable, visible } = config[key];

    switch (colType as ColumnType) {
      default:
        break;
    }

    const header = `${prefix ?? 'table'}.${key}`;
    const type: ColumnType = colType ?? 'Text';
    const column: ITableColumn = {
      id: i + 1,
      type,
      header,
      field: key,
      sortField: sortField ?? key,
      sortable: sortable !== undefined ? sortable : true,
      visible: visible ?? true,
      customizeValue: (val: any | any[]): any => val,
    };
    return column;
  });
}
