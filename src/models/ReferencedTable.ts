import { TokenLocation } from "./TokenLocation";

export class ReferencedTable {
  tableName: string;
  schemaName: string;
  databaseName: string;
  aliases: Set<string>;
  locations: Set<TokenLocation>;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.aliases = new Set();
    this.locations = new Set();
  }

  static clone(referencedTable: ReferencedTable): ReferencedTable {
    if (referencedTable === undefined || referencedTable === null) {
      return null;
    }
    const clonedReferencedTable: ReferencedTable = new ReferencedTable(referencedTable.tableName);
    clonedReferencedTable.schemaName = referencedTable.schemaName;
    clonedReferencedTable.databaseName = referencedTable.databaseName;
    referencedTable.aliases.forEach(alias => clonedReferencedTable.aliases.add(alias));
    referencedTable.locations.forEach(location => clonedReferencedTable.locations.add(TokenLocation.clone(location)));
    return clonedReferencedTable;
  }
}