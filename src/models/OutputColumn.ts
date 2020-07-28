export class OutputColumn {
  columnName: string;
  tableName: string;
  tableAlias: string;

  constructor(columnName: string, tableName: string, tableAlias: string) {
    this.columnName = columnName;
    this.tableName = tableName;
    this.tableAlias = tableAlias;
  }
  
}