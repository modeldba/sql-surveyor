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

  subqueries: { [subqueryStartIndex: number]: ParsedQuery };
  commonTableExpressions: { [cteStartIndex: number]: ParsedQuery };

  constructor(queryType: QueryType, query: string, queryLocation: TokenLocation) {
    this.outputColumns = [];
    this.referencedColumns = {};
    this.referencedTables = {};
    
    this.tokens = {};

    this.query = query;
    this.queryType = queryType;
    this.queryLocation = queryLocation;

    this.subqueries = {};
    this.commonTableExpressions = {};
  }

  getAllReferencedTables(): { [tableName: string]: ReferencedTable } {
    const tables: { [tableName: string]: ReferencedTable } = {};
    for (const referencedTableName in this.referencedTables) {
      tables[referencedTableName] = ReferencedTable.clone(this.referencedTables[referencedTableName]);
    }
    for (const query of [...Object.values(this.subqueries), ...Object.values(this.commonTableExpressions)]) {
      const queryReferencedTables: { [tableName: string]: ReferencedTable } = query.getAllReferencedTables();
      for (const referencedTableName in query.getAllReferencedTables()) {
        if (tables[referencedTableName] === undefined) {
          tables[referencedTableName] = ReferencedTable.clone(queryReferencedTables[referencedTableName]);
        } else {
          const table = tables[referencedTableName];
          if (table.schemaName === null && queryReferencedTables[referencedTableName].schemaName !== null) {
            table.schemaName = queryReferencedTables[referencedTableName].schemaName;
          }
          if (table.databaseName === null && queryReferencedTables[referencedTableName].databaseName !== null) {
            table.databaseName = queryReferencedTables[referencedTableName].databaseName;
          }
          queryReferencedTables[referencedTableName].aliases.forEach(alias => table.aliases.add(alias));
          queryReferencedTables[referencedTableName].locations.forEach(location => table.locations.add(TokenLocation.clone(location)));
        }
      }
    }
    return tables;
  }

  getAllReferencedColumns(): { [columnName: string]: ReferencedColumn } {
    // TODO merge all referenced columns from subqueries and CTE
    return this.referencedColumns;
  }
  
  getTableFromAlias(alias: string): string {
    for (const table of Object.values(this.referencedTables)) {
      if (table.aliases.has(alias)) {
        return table.tableName;
      }
    }
    for (const query of Object.values(this.subqueries)) {
      const subqueryTable = query.getTableFromAlias(alias);
      if (subqueryTable !== null) {
        return subqueryTable;
      }
    }
    for (const cte of Object.values(this.commonTableExpressions)) {
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
    for (const query of Object.values(this.subqueries)) {
      if (query.referencedTables[tableName] !== undefined) {
        return Array.from(query.referencedTables[tableName].aliases);
      }
    }
    for (const cte of Object.values(this.commonTableExpressions)) {
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
    const lastIndex = tokenStartIndices[tokenStartIndices.length - 1];
    if (tokenStartIndices.length > 0 && stringIndex >= (parseInt(lastIndex) + this.tokens[lastIndex].value.length)) {
      // Index is past the tokens in this query, previous token is the last token
      return this.tokens[lastIndex];
    }
    let previousTokenStartIndex: number = null;
    for (let i = 0; i < tokenStartIndices.length; i++) {
      const currentTokenStartIndex: number = Number(tokenStartIndices[i]);
      let nextTokenStartIndex: number = null;
      if (tokenStartIndices[i + 1] !== undefined) {
        nextTokenStartIndex = Number(tokenStartIndices[i + 1]);
      }
      const currentTokenStopIndex = this.tokens[tokenStartIndices[i]].location.stopIndex;
      if (stringIndex >= currentTokenStopIndex 
          && nextTokenStartIndex !== null 
          && stringIndex < nextTokenStartIndex) {
        // We're past the current token, but before the next token
        return this.tokens[currentTokenStartIndex];
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

  getReferencedColumn(columnName: string, tableName: string, tableAlias: string) {
    for (const referencedColumnName in this.referencedColumns) {
      if (referencedColumnName === columnName) {
        const referencedColumn = this.referencedColumns[referencedColumnName];
        if ((tableName === null || referencedColumn.tableName === tableName) 
              && (tableAlias === null || referencedColumn.tableAlias === tableAlias)) {
           return referencedColumn;
        }
      }
    }
    return null;
  }

  /**
   * Gets the smallest query at a given location 
   * i.e. the smallest subquery or common table expression that encapsulates
   * the specified index
   * @param stringIndex 
   */
  getSmallestQueryAtLocation(stringIndex: number) {
    let smallestQuery: ParsedQuery = this;
    let smallerQuery: ParsedQuery = this;
    while (smallerQuery !== null) {
      smallerQuery = smallestQuery._getCommonTableExpressionAtLocation(stringIndex);
      if (smallerQuery === null) {
        smallerQuery = smallestQuery._getSubqueryAtLocation(stringIndex);
      }
      if (smallerQuery !== null) {
        smallestQuery = smallerQuery;
      }
    }
    return smallestQuery;
  }

  _getSubqueryAtLocation(stringIndex: number): ParsedQuery {
    const subqueryIndices = Object.keys(this.subqueries);
    const subqueryIndex = this._getParsedQueryIndexAtLocation(stringIndex, subqueryIndices);
    if (subqueryIndex !== null) {
      return this.subqueries[subqueryIndices[subqueryIndex]];
    }
    return null;
  }
  
  _getCommonTableExpressionAtLocation(stringIndex: number): ParsedQuery {
    const cteIndices = Object.keys(this.commonTableExpressions);
    const cteIndex = this._getParsedQueryIndexAtLocation(stringIndex, cteIndices);
    if (cteIndex !== null) {
      return this.commonTableExpressions[cteIndices[cteIndex]];
    }
    return null;
  }

  _getParsedQueryIndexAtLocation(stringIndex: number, queryStartIndices: string[]): number {
    if (stringIndex === undefined || stringIndex === null
        || queryStartIndices === undefined || queryStartIndices === null) {
      return null;
    }
    for (let i = 0; i < queryStartIndices.length; i++) {
      const currentQueryStartIndex: number = Number(queryStartIndices[i]);
      let nextQueryStartIndex: number = null;
      if (queryStartIndices[i + 1] !== undefined) {
        nextQueryStartIndex = Number(queryStartIndices[i + 1]);
      }
      if (stringIndex >= currentQueryStartIndex 
        && (nextQueryStartIndex === null || stringIndex < nextQueryStartIndex)) {
        return i;
      }
    }
    return null;
  }

  _addAliasForTable(aliasName: string, tableName: string): void {
    this.referencedTables[tableName].aliases.add(aliasName);
  }

  _addCommonTableExpression(parsedQuery: ParsedQuery): void {
    this.commonTableExpressions[parsedQuery.queryLocation.startIndex] = parsedQuery;
  }

  _addOutputColumn(columnName: string, tableNameOrAlias: string): void {
    let tableName = null;
    let tableAlias = null;
    if (tableNameOrAlias !== null) {
      tableName = this.getTableFromAlias(tableNameOrAlias);
      if (tableName !== null) {
        tableAlias = tableNameOrAlias;
      } else {
        tableName = tableNameOrAlias;
      }
    }
    const outputColumn = new OutputColumn(columnName, tableName, tableAlias);
    this.outputColumns.push(outputColumn);
  }

  _addReferencedColumn(columnName: string, tableNameOrAlias: string, location: TokenLocation): void {
    let tableName = null;
    let tableAlias = null;
    if (tableNameOrAlias !== null) {
      tableName = this.getTableFromAlias(tableNameOrAlias);
      if (tableName !== null) {
        tableAlias = tableNameOrAlias;
      } else {
        tableName = tableNameOrAlias;
      }
    }
    const existingReferencedColumn = this.getReferencedColumn(columnName, tableName, tableAlias);
    if (existingReferencedColumn !== null && existingReferencedColumn !== undefined) {
      existingReferencedColumn.locations.push(location);
    } else {
      this.referencedColumns[columnName] = new ReferencedColumn(columnName, tableName, tableAlias, location);
    }
  }

  _addSubQuery(parsedQuery: ParsedQuery): void {
    this.subqueries[parsedQuery.queryLocation.startIndex] = parsedQuery;
  }

  _addTableNameLocation(tableName: string, location: TokenLocation, schemaName: string, databaseName: string): void {
    const subquery = this._getSubqueryAtLocation(location.startIndex);
    if (subquery !== null) {
      subquery._addTableNameLocation(tableName, location, schemaName, databaseName);
      return;
    }
    const cte = this._getCommonTableExpressionAtLocation(location.startIndex);
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

  _addToken(location: TokenLocation, token: string): void {
    this.tokens[location.startIndex] = new Token(token, location);
  }

  /**
   * Aliases can be added to the ParsedQuery before the table itself
   * This method merges the aliases into the appropriate ReferencedTable
   */
  _consolidateTables(): void {
    Object.values(this.commonTableExpressions).forEach(cte => cte._consolidateTables());
    Object.values(this.subqueries).forEach(subquery => subquery._consolidateTables());
    const tableKeysToRemove: string[] = [];
    for (const tableName in this.referencedTables) {
      const realTableName = this.getTableFromAlias(tableName);
      if (realTableName !== null) {
        tableKeysToRemove.push(tableName);
        for (const location of this.referencedTables[tableName].locations) {
          this._addTableNameLocation(realTableName, location, this.referencedTables[tableName].schemaName, this.referencedTables[tableName].databaseName);
        }
      }
    }
    for (const key of tableKeysToRemove) {
      delete this.referencedTables[key];
    }

    for (const outputColumn of this.outputColumns) {
      if (outputColumn.tableName !== null) {
        const realTableName = this.getTableFromAlias(outputColumn.tableName);
        if (realTableName !== null) {
          outputColumn.tableAlias = outputColumn.tableName;
          outputColumn.tableName = realTableName;
        }
      }
    }
  }
}