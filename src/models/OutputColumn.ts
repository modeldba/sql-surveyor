export class OutputColumn {
  columnName: string;
  columnAlias: string;
  tableName: string;
  tableAlias: string;

  constructor(columnName: string, columnAlias: string, tableName: string, tableAlias: string) {
    this.columnName = columnName;
    this.columnAlias = columnAlias;
    this.tableName = tableName;
    this.tableAlias = tableAlias;
  }
  
}