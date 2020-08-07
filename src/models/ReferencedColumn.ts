import { TokenLocation } from "./TokenLocation";

export class ReferencedColumn {
  columnName: string;
  tableName: string;
  tableAlias: string;
  locations: Set<TokenLocation>;

  constructor(columnName: string, tableName: string, tableAlias: string, location: TokenLocation) {
    this.columnName = columnName;
    this.tableName = tableName;
    this.tableAlias = tableAlias;
    this.locations = new Set<TokenLocation>();
    if (location !== null && location !== undefined) {
      this.locations.add(location);
    }
  }

}