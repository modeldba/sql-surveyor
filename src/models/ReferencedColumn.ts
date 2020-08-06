import { TokenLocation } from "./TokenLocation";

export class ReferencedColumn {
  columnName: string;
  tableName: string;
  tableAlias: string;
  locations: TokenLocation[];

  constructor(columnName: string, tableName: string, tableAlias: string, location: TokenLocation) {
    this.columnName = columnName;
    this.tableName = tableName;
    this.tableAlias = tableAlias;
    this.locations = [];
    if (location !== null && location !== undefined) {
      this.locations.push(location);
    }
  }

}