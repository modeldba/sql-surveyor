import { TokenLocation } from "./TokenLocation";

export class ReferencedColumn {
  columnName: string;
  tableName: string;
  tableAlias: string;
  locations: TokenLocation[];
}