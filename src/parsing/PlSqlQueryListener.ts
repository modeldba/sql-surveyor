import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { PlSqlParserListener, PlSQLGrammar } from 'antlr4ts-sql';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { ReferencedTable } from '../models/ReferencedTable';

export class PlSqlQueryListener extends BaseSqlQueryListener implements PlSqlParserListener {

  unquote(value: string) {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, value.length - 1);
    }
    return value;
  }

  _getAliasStartIndex(value: string): number {
    return super._getAliasStartIndex(value, '"', '"');
  }

  _getTableAliasEndLocation(value: string): number {
    return super._getTableAliasEndLocation(value, '"', '"');
  }

  parseContextToReferencedTable(ctx: any) {
    const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const tableText = tableLocation.getToken(this.input);
    let tableNameOrAlias = tableText;
    let schemaName = null;
    if (tableText.includes('.')) {
      const columnTextSplit: string[] = tableText.split('.');
      tableNameOrAlias = this.unquote(columnTextSplit[columnTextSplit.length - 1]);
      schemaName = this.unquote(columnTextSplit[columnTextSplit.length - 2]);
    } else {
      tableNameOrAlias = this.unquote(tableNameOrAlias);
    }
    const referencedTable = new ReferencedTable(tableNameOrAlias);
    referencedTable.schemaName = schemaName;
    return referencedTable;
  }
  
  enterData_manipulation_language_statements(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

  enterUnit_statement(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
  }

  enterSubquery(ctx: any) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
    if (!(ctx._parent instanceof PlSQLGrammar.Factoring_elementContext) // Ignore the "WITH name AS (query)" portion of CTE
         && !(ctx._parent.children[0] instanceof PlSQLGrammar.Subquery_factoring_clauseContext) // Ignore the trailing portion of a CTE query
         && !(parsedQuery.queryLocation.startIndex === subqueryLocation.startIndex
            && parsedQuery.queryLocation.stopIndex === subqueryLocation.stopIndex)) { // PLSQL grammar has EVERY query as a subquery, prevent repeating the same query
      parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
    }
  }

  enterFactoring_element(ctx: any) {
    const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
    parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
  }

  exitTable_alias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = this.parseContextToReferencedTable(ctx._parent.children[0].children[0].children[0]);
    let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(this.unquote(aliasLocation.getToken(this.input)), referencedTable.tableName);
  }

  exitTableview_name(ctx: any) {
    if (!(ctx._parent instanceof PlSQLGrammar.Select_list_elementsContext)) { // We already detect this context separately
      const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      const referencedTable = this.parseContextToReferencedTable(ctx);
      let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
      parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
    }
  }

  exitColumn_name(ctx: any) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(columnLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(columnLocation.startIndex);
    const columnText = columnLocation.getToken(this.input);
    let columnName = columnText;
    let tableNameOrAlias = null;
    if (columnText.includes('.')) {
      const columnTextSplit: string[] = columnText.split('.');
      columnName = this.unquote(columnTextSplit[columnTextSplit.length - 1]);
      tableNameOrAlias = this.unquote(columnTextSplit[columnTextSplit.length - 2]);
      let tableNameOrAliasStartIndex = columnLocation.stopIndex - columnTextSplit[columnTextSplit.length - 1].length - columnTextSplit[columnTextSplit.length - 2].length;
      let tableNameOrAliasStopIndex = tableNameOrAliasStartIndex + columnTextSplit[columnTextSplit.length - 2].length - 1;
      const tableNameOrAliasLocation = new TokenLocation(columnLocation.lineStart, columnLocation.lineEnd, tableNameOrAliasStartIndex, tableNameOrAliasStopIndex);
      parsedQuery._addTableNameLocation(tableNameOrAlias, tableNameOrAliasLocation, null, null);
    } else {
      columnName = this.unquote(columnName);
    }
    parsedQuery._addReferencedColumn(columnName, tableNameOrAlias, columnLocation);
  }

  exitGeneral_element(ctx: any) {
    let parentContext = ctx._parent;
    while (parentContext !== undefined) {
      if (parentContext instanceof PlSQLGrammar.Select_list_elementsContext) {
        // This is an output column, don't record it as a referenced column
        return;
      }
      parentContext = parentContext._parent;
    }
    this.exitColumn_name(ctx);
  }

  exitSelect_list_elements(ctx: any) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(columnLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(columnLocation.startIndex);
    let columnText = columnLocation.getToken(this.input);
    let columnName = columnText;
    let columnAlias = null;
    let tableNameOrAlias = null;
    if (columnText.includes('.')) {
      // Column may have a table alias
      const functionArgumentLocation = this._getFunctionArgumentLocation(ctx, columnLocation);
      if (functionArgumentLocation !== null) {
        columnText = functionArgumentLocation.getToken(this.input);
      }
      const tableNameOrAliasStopIndex = this._getTableAliasEndLocation(columnText);
      if (tableNameOrAliasStopIndex !== null) {
        tableNameOrAlias = this.unquote(columnText.substring(0, tableNameOrAliasStopIndex));
        const tableNameOrAliasLocation = new TokenLocation(columnLocation.lineStart, columnLocation.lineEnd, columnLocation.startIndex, columnLocation.startIndex + tableNameOrAliasStopIndex - 1);
        parsedQuery._addTableNameLocation(tableNameOrAlias, tableNameOrAliasLocation, null, null);
      }
    }
    columnName = columnName.trim();
    const lastUnquotedSpaceIndex = this._getAliasStartIndex(columnName);
    if (lastUnquotedSpaceIndex !== null) {
      // Column has an alias
      columnAlias = columnName.substring(lastUnquotedSpaceIndex);
      columnName = columnName.substring(0, lastUnquotedSpaceIndex - 1).trimEnd();
      if (columnName.toUpperCase().endsWith('AS')) {
        columnName = columnName.substring(0, columnName.length - 2).trimEnd();
      }
    }
    columnName = this.unquote(columnName);
    if (columnAlias !== null) {
      columnAlias = this.unquote(columnAlias);
    }
    parsedQuery._addOutputColumn(columnName, columnAlias, tableNameOrAlias);
  }

  _getFunctionArgumentLocation(ctx: any, columnLocation: TokenLocation): TokenLocation {
    const functionRules = [PlSQLGrammar.Numeric_functionContext, PlSQLGrammar.String_functionContext, PlSQLGrammar.Other_functionContext];
    const argumentRules = [PlSQLGrammar.ExpressionContext];
    return super._getFunctionArgumentLocation(ctx, columnLocation, functionRules, argumentRules);
  }

  exitSelected_list(ctx: any) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    if (columnLocation.getToken(this.input) === '*') {
      // Otherwise, the columns will be picked up by exitSelected_list_elements on their own
      this.exitSelect_list_elements(ctx);
    }
  }

}