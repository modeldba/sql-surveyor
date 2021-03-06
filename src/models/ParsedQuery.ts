import { QueryType } from "./QueryType";
import { OutputColumn } from "./OutputColumn";
import { ReferencedColumn } from "./ReferencedColumn";
import { ReferencedTable } from "./ReferencedTable";
import { TokenLocation } from "./TokenLocation";
import { Token } from "./Token";
import { ParsingError } from "./ParsingError";
import { TokenType } from "./TokenType";

export class ParsedQuery {

  query: string;
  queryType: QueryType;
  outputColumns: OutputColumn[];
  referencedColumns: ReferencedColumn[];
  referencedTables: { [tableName: string]: ReferencedTable };
  
  tokens: { [queryStartIndex: number]: Token };
  
  queryLocation: TokenLocation;
  queryErrors: ParsingError[];

  commonTableExpressionName: string;

  subqueries: { [subqueryStartIndex: number]: ParsedQuery };
  commonTableExpressions: { [cteStartIndex: number]: ParsedQuery };

  constructor(queryType: QueryType, query: string, queryLocation: TokenLocation) {
    this.outputColumns = [];
    this.referencedColumns = [];
    this.referencedTables = {};
    
    this.tokens = {};

    this.query = query;
    this.queryType = queryType;
    this.queryLocation = queryLocation;

    this.queryErrors = [];
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
      for (const referencedTableName in queryReferencedTables) {
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

  getAllReferencedColumns(): ReferencedColumn[] {
    const columns: ReferencedColumn[] = [...this.referencedColumns];
    for (const query of [...Object.values(this.subqueries), ...Object.values(this.commonTableExpressions)]) {
      const queryReferencedColumns: ReferencedColumn[] = query.getAllReferencedColumns();
      for (const referencedColumn of queryReferencedColumns) {
        const existingReferencedColumnCandidates: ReferencedColumn[] = columns.filter(column => column.columnName === referencedColumn.columnName);
        let matchedCandidate: boolean = false;
        for (const existingReferencedColumnCandidate of existingReferencedColumnCandidates) {
          if (existingReferencedColumnCandidate.tableAlias === referencedColumn.tableAlias
              || existingReferencedColumnCandidate.tableName === referencedColumn.tableName) {
            matchedCandidate = true;
            if (existingReferencedColumnCandidate.tableName === null && referencedColumn.tableName !== null) {
              existingReferencedColumnCandidate.tableName = referencedColumn.tableName;
            }
            if (existingReferencedColumnCandidate.tableAlias === null && referencedColumn.tableAlias !== null) {
              existingReferencedColumnCandidate.tableAlias = referencedColumn.tableAlias;
            }
            referencedColumn.locations.forEach(location => existingReferencedColumnCandidate.locations.add(TokenLocation.clone(location)));
            break;
          }
        }
        if (!matchedCandidate) {
          columns.push(referencedColumn);
        }
      }
    }
    return columns;
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
      if (stringIndex > currentTokenStopIndex 
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

  getNextTokenFromLocation(stringIndex: number): Token {
    const previousToken = this.getPreviousTokenFromLocation(stringIndex);
    if (previousToken === null) {
      return null;
    }
    const tokenStartIndices: string[] = Object.keys(this.tokens);
    const previousTokenIndex = tokenStartIndices.indexOf(previousToken.location.startIndex.toString());
    const nextToken = this.tokens[tokenStartIndices[previousTokenIndex + 2]];
    if (nextToken !== undefined && nextToken !== null) {
      return nextToken;
    }
    return null;
  }

  getReferencedColumn(columnName: string, tableName?: string, tableAlias?: string): ReferencedColumn {
    for (const referencedColumn of this.referencedColumns) {
      if (referencedColumn.columnName === columnName) {
        if ((tableName === null || tableName === undefined || referencedColumn.tableName === tableName) 
              && (tableAlias === null || tableAlias === undefined || referencedColumn.tableAlias === tableAlias)) {
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
  getSmallestQueryAtLocation(stringIndex: number): ParsedQuery {
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
    const subqueryIndex = this._getParsedQueryIndexAtLocation(stringIndex, this.subqueries);
    if (subqueryIndex !== null) {
      const subqueryIndices = Object.keys(this.subqueries);
      return this.subqueries[subqueryIndices[subqueryIndex]];
    }
    return null;
  }
  
  _getCommonTableExpressionAtLocation(stringIndex: number): ParsedQuery {
    const cteIndex = this._getParsedQueryIndexAtLocation(stringIndex, this.commonTableExpressions);
    if (cteIndex !== null) {
      const cteIndices = Object.keys(this.commonTableExpressions);
      return this.commonTableExpressions[cteIndices[cteIndex]];
    }
    return null;
  }

  _getParsedQueryIndexAtLocation(stringIndex: number, queries: { [queryStartIndex: number]: ParsedQuery }): number {
    if (stringIndex === undefined || stringIndex === null
        || queries === undefined || queries === null) {
      return null;
    }
    const queryStartIndices = Object.keys(queries);
    for (let i = 0; i < queryStartIndices.length; i++) {
      const currentQueryStartIndex: number = Number(queryStartIndices[i]);
      if (stringIndex >= currentQueryStartIndex 
          && stringIndex <= queries[queryStartIndices[i]].queryLocation.stopIndex) {
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

  _addOutputColumn(columnName: string, columnAlias: string, tableNameOrAlias: string): void {
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
    const outputColumn = new OutputColumn(columnName, columnAlias, tableName, tableAlias);
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
      existingReferencedColumn.locations.add(location);
    } else {
      this.referencedColumns.push(new ReferencedColumn(columnName, tableName, tableAlias, location));
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

  _addToken(location: TokenLocation, type: TokenType, token: string): void {
    this.tokens[location.startIndex] = new Token(token, type, location);
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

  /**
   * Set the common table expression names for any CTEs.
   * Must be called after tokens have been added to the CTEs.
   */
  _setCommonTableExpressionNames(): void {
    for (const cte of Object.values(this.commonTableExpressions)) {
      let cteName: string = null;
      for (const token of Object.values(cte.tokens)) {
        if (token.value.toUpperCase() !== 'WITH') {
          cteName = token.value;
          break;
        }
      }
      cte.commonTableExpressionName = cteName;
      cte._setCommonTableExpressionNames();
    }
    for (const subquery of Object.values(this.subqueries)) {
      subquery._setCommonTableExpressionNames();
    }
  }
}