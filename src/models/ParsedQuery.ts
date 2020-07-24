import { QueryType } from "./QueryType";
import { OutputColumn } from "./OutputColumn";
import { ReferencedColumn } from "./ReferencedColumn";
import { ReferencedTable } from "./ReferencedTable";
import { TokenLocation } from "./TokenLocation";
import { Token } from "./Token";

export class ParsedQuery {

  query: string;
  queryType: QueryType;
  outputColumns: OutputColumn[];
  referencedColumns: { [columnName: string]: ReferencedColumn };
  referencedTables: { [tableName: string]: ReferencedTable };

  tokens: { [queryStartIndex: number]: Token };

  queryLocation: TokenLocation;
  errorLocation: TokenLocation;

  subqueries: ParsedQuery[];
  commonTableExpressions: ParsedQuery[];

  constructor(queryType: QueryType, query: string, queryLocation: TokenLocation) {
    this.outputColumns = [];
    this.referencedColumns = {};
    this.referencedTables = {};
    
    this.tokens = {};

    this.query = query;
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

  getTokenAtLocation(stringIndex: number): Token {
    if (stringIndex === undefined || stringIndex === null) {
      return null;
    }
    const tokenStartIndices: string[] = Object.keys(this.tokens);
    for (let i = 0; i < tokenStartIndices.length; i++) {
      const currentTokenStartIndex: number = Number(tokenStartIndices[i]);
      let nextTokenStartIndex: number = null;
      if (tokenStartIndices[i + 1] !== undefined) {
        nextTokenStartIndex = Number(tokenStartIndices[i + 1]);
      }
      if (stringIndex >= currentTokenStartIndex
          && (nextTokenStartIndex === null || stringIndex < nextTokenStartIndex)) {
        return this.tokens[currentTokenStartIndex];
      }
    }
    return null;
  }

  getPreviousTokenFromLocation(stringIndex: number): Token {
    if (stringIndex === undefined || stringIndex === null) {
      return null;
    }
    const tokenStartIndices: string[] = Object.keys(this.tokens);
    let previousTokenStartIndex: number = null;
    for (let i = 0; i < tokenStartIndices.length; i++) {
      const currentTokenStartIndex: number = Number(tokenStartIndices[i]);
      let nextTokenStartIndex: number = null;
      if (tokenStartIndices[i + 1] !== undefined) {
        nextTokenStartIndex = Number(tokenStartIndices[i + 1]);
      }
      if (stringIndex >= currentTokenStartIndex
          && (nextTokenStartIndex === null || stringIndex < nextTokenStartIndex)) {
        if (previousTokenStartIndex === null) {
          return null; // No previous token, at the first token
        }
        return this.tokens[previousTokenStartIndex];
      }
      previousTokenStartIndex = currentTokenStartIndex;
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

  _addTableNameLocation(tableName: string, location: TokenLocation, schemaName: string, databaseName: string): void {
    const subquery = this._getSubqueryAtLocation(location);
    if (subquery !== null) {
      subquery._addTableNameLocation(tableName, location, schemaName, databaseName);
      return;
    }
    const cte = this._getCommonTableExpressionAtLocation(location);
    if (cte !== null) {
      cte._addTableNameLocation(tableName, location, schemaName, databaseName);
      return;
    }
    const aliasTableName = this.getTableFromAlias(tableName);
    if (aliasTableName) {
      tableName = aliasTableName;
    }
    if (this.referencedTables[tableName] === undefined) {
      this.referencedTables[tableName] = new ReferencedTable(tableName);
      this.referencedTables[tableName].schemaName = schemaName;
      this.referencedTables[tableName].databaseName = databaseName;
    }
    this.referencedTables[tableName].locations.add(location);
  }

  _addToken(location: TokenLocation, token: string) {
    this.tokens[location.startIndex] = new Token(token, location);
  }
}