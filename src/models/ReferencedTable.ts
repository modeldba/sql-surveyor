import { TokenLocation } from "./TokenLocation";

export class ReferencedTable {
  tableName: string;
  aliases: Set<string>;
  locations: Set<TokenLocation>;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.aliases = new Set();
    this.locations = new Set();
  }
}