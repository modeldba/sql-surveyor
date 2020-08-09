import { TSqlParserListener } from '../../output/tsql/TSqlParserListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedSql } from '../models/ParsedSql';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { ParserRuleContext } from 'antlr4ts';
import { ParseHelpers } from './ParseHelpers';

export class TSqlQueryListener implements TSqlParserListener {

  input: string;
  tableNameLocations: { [tableName: string]: TokenLocation[] };
  tableAlias: { [tableName: string]: string[] };

  parsedSql: ParsedSql;

  constructor(input: string) {
    this.input = input;
    this.tableNameLocations = {};
    this.tableAlias = {};

    this.parsedSql = new ParsedSql();
  }

  unquote(value: string) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, value.length - 1);
    }
    return value;
  }

  _getClauseLocation(ctx: any): TokenLocation {
    let stopLine = ctx._start._line;
    let stopIndex = this.input.length;
    if (ctx._stop !== undefined) {
      stopLine = ctx._stop._line;
      stopIndex = ctx._stop.stop;
    }
    const queryLocation: TokenLocation = new TokenLocation(ctx._start._line, stopLine, ctx._start.start, stopIndex);
    return queryLocation;
  }

  enterDml_clause(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

  enterDdl_clause(ctx: any) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
  }

  enterSubquery(ctx: any) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
    parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
  }

  enterCommon_table_expression(ctx: any) {
    const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
    parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
  }

  exitFull_table_name(ctx: any) {
    this.exitTable_name(ctx);
  }

  exitTable_name(ctx: any) {
    const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = ParseHelpers.parseContextToReferencedTable(ctx, this.input, this.unquote);
    let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
  }

  exitTable_alias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = ParseHelpers.parseContextToReferencedTable(ctx._parent._parent.children[0].children[0], this.input, this.unquote);
    let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(this.unquote(aliasLocation.getToken(this.input)), referencedTable.tableName);
  }

  exitColumn_elem(ctx) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(columnLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(columnLocation.startIndex);
    const columnText = this.unquote(columnLocation.getToken(this.input));
    let columnName = columnText;
    let tableNameOrAlias = null;
    if (columnText.includes('.')) {
      const columnTextSplit: string[] = columnText.split('.');
      columnName = columnTextSplit[columnTextSplit.length - 1];
      tableNameOrAlias = columnTextSplit[columnTextSplit.length - 2];
    }
    parsedQuery._addOutputColumn(columnName, tableNameOrAlias);
  }

  exitFull_column_name(ctx) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(columnLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(columnLocation.startIndex);
    const columnText = this.unquote(columnLocation.getToken(this.input));
    let columnName = columnText;
    let tableNameOrAlias = null;
    if (columnText.includes('.')) {
      const columnTextSplit: string[] = columnText.split('.');
      columnName = columnTextSplit[columnTextSplit.length - 1];
      tableNameOrAlias = columnTextSplit[columnTextSplit.length - 2];
    }
    parsedQuery._addReferencedColumn(columnName, tableNameOrAlias, columnLocation);
  }

  exitAsterisk(ctx) {
    this.exitColumn_elem(ctx);
  }

} 