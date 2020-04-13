import { QueryType } from "./QueryType";
import { OutputColumn } from "./OutputColumn";
import { ReferencedColumn } from "./ReferencedColumn";
import { ReferencedTable } from "./ReferencedTable";
import { TokenLocation } from "./TokenLocation";

export class ParsedQuery {

  query: string;
  queryType: QueryType;
  outputColumns: OutputColumn[];
  referencedColumns: { [columnName: string]: ReferencedColumn };
  referencedTables: { [tableName: string]: ReferencedTable };

  queryLocation: TokenLocation;
  errorLocation: TokenLocation;

  subqueries: ParsedQuery[];
  commonTableExpressions: ParsedQuery[];

  constructor(queryType: QueryType, queryLocation: TokenLocation) {
    this.outputColumns = [];
    this.referencedColumns = {};
    this.referencedTables = {};
    
    this.queryLocation = queryLocation;

    this.subqueries = [];
    this.commonTableExpressions = [];
  }
  
  getTableFromAlias(alias: string): string {
    for (const table of Object.values(this.referencedTables)) {
      if (table.aliases.has(alias)) {
        return table.tableName;
      }
    }
    for (const query of this.subqueries) {
      const subqueryTable = query.getTableFromAlias(alias);
      if (subqueryTable !== null) {
        return subqueryTable;
      }
    }
    for (const cte of this.commonTableExpressions) {
      const cteTable = cte.getTableFromAlias(alias);
      if (cteTable !== null) {
        return cteTable;
      }
    }
    return null;
  }

  getAliasesForTable(tableName: string): string[] {
    if (this.referencedTables[tableName] !== undefined) {
      return Array.from(this.referencedTables[tableName].aliases);
    }
    for (const query of this.subqueries) {
      if (query.referencedTables[tableName] !== undefined) {
        return Array.from(query.referencedTables[tableName].aliases);
      }
    }
    for (const cte of this.commonTableExpressions) {
      if (cte.referencedTables[tableName] !== undefined) {
        return Array.from(cte.referencedTables[tableName].aliases);
      }
    }
    return null;
  }

  _getSubqueryAtLocation(location: TokenLocation): ParsedQuery {
    // TODO: Support subquery check
    return null;
  }
  
  _getCommonTableExpressionAtLocation(location: TokenLocation): ParsedQuery {
    // TODO: Support CTE check
    return null;
  }

  _addAliasForTable(aliasName: string, tableName: string) {
    this.referencedTables[tableName].aliases.add(aliasName);
  }

  _addTableNameLocation(tableName: string, location: TokenLocation): void {
    const subquery = this._getSubqueryAtLocation(location);
    if (subquery !== null) {
      subquery._addTableNameLocation(tableName, location);
      return;
    }
    const cte = this._getCommonTableExpressionAtLocation(location);
    if (cte !== null) {
      cte._addTableNameLocation(tableName, location);
      return;
    }
    const aliasTableName = this.getTableFromAlias(tableName);
    if (aliasTableName) {
      tableName = aliasTableName;
    }
    if (this.referencedTables[tableName] === undefined) {
      this.referencedTables[tableName] = new ReferencedTable(tableName);
    }
    this.referencedTables[tableName].locations.add(location);
  }

}