import { PLpgSQLParserListener } from '../../output/plpgsql/PLpgSQLParserListener';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { ReferencedTable } from '../models/ReferencedTable';
import { Select_sublistContext, With_queryContext } from '../../output/plpgsql/PLpgSQLParser';

export class PLpgSQLQueryListener extends BaseSqlQueryListener implements PLpgSQLParserListener {

  unquote(value: string) {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, value.length - 1);
    }
    return value;
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

  enterData_statement(ctx: any) {
    if (!(ctx._parent instanceof With_queryContext)) { // Ignore the trailing portion of a CTE query
      const queryLocation: TokenLocation = this._getClauseLocation(ctx);
      this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
    }
  }

  enterSchema_statement(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
  }

  enterScript_statement(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(null, queryLocation.getToken(this.input), queryLocation));
  }

  enterSelect_stmt_no_parens(ctx: any) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
    parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
  }

  enterWith_query(ctx: any) {
    const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
    parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
  }

  exitSchema_qualified_name(ctx: any) {
    const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = this.parseContextToReferencedTable(ctx);
    let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
  }

  exitAlias_clause(ctx: any) {
    if (ctx._alias !== null && ctx._alias !== undefined) {
      const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      const referencedTable = this.parseContextToReferencedTable(ctx._parent.children[0]);
      let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
      parsedQuery._addAliasForTable(this.unquote(aliasLocation.getToken(this.input)), referencedTable.tableName);
    }
  }

  exitIndirection_var(ctx: any) {
    let parentContext = ctx._parent;
    while (parentContext !== undefined) {
      if (parentContext instanceof Select_sublistContext) {
        // This is an output column, don't record it as a referenced column
        return;
      }
      parentContext = parentContext._parent;
    }
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

  exitIndirection_identifier(ctx: any) {
    this.exitIndirection_var(ctx);
  }

  exitSelect_sublist(ctx: any) {
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
    parsedQuery._addOutputColumn(columnName, tableNameOrAlias);
  }

}