import { TSqlParserListener, TSQLGrammar } from 'antlr4ts-sql';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { ReferencedTable } from '../models/ReferencedTable';

export class TSqlQueryListener extends BaseSqlQueryListener implements TSqlParserListener {

  unquote(value: string) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, value.length - 1);
    }
    return value;
  }

  parseContextToReferencedTable(ctx: any) {
    let databaseName: string = null;
    if (ctx._database !== undefined) {
      const databaseLocation: TokenLocation = new TokenLocation(ctx._database._start._line, ctx._database._stop._line, ctx._database._start.start, ctx._database._stop.stop);
      databaseName = this.unquote(databaseLocation.getToken(this.input));
    }
    let schemaName: string = null;
    if (ctx._schema !== undefined) {
      const schemaLocation: TokenLocation = new TokenLocation(ctx._schema._start._line, ctx._schema._stop._line, ctx._schema._start.start, ctx._schema._stop.stop);
      schemaName = this.unquote(schemaLocation.getToken(this.input));
    }
    let tableNameOrAlias: string = null;
    let tableLocation: TokenLocation;
    if (ctx._table !== undefined) {
      tableLocation = new TokenLocation(ctx._table._start._line, ctx._table._stop._line, ctx._table._start.start, ctx._table._stop.stop);
      tableNameOrAlias = this.unquote(tableLocation.getToken(this.input));
    } else {
      tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      tableNameOrAlias = this.unquote(tableLocation.getToken(this.input));
    }
    const referencedTable = new ReferencedTable(tableNameOrAlias);
    referencedTable.schemaName = schemaName;
    referencedTable.databaseName = databaseName;
    return referencedTable;
  }

  _getClauseLocationWithoutTrailingSemicolon(queryLocation: TokenLocation): TokenLocation {
    const whitespaceRegex = /[\s]/;
    let newStopIndex = queryLocation.stopIndex;
    while (this.input[newStopIndex] !== undefined 
            && (whitespaceRegex.test(this.input[newStopIndex])
                || this.input[newStopIndex] === ';')) {
      newStopIndex--;
    }
    if (newStopIndex !== queryLocation.stopIndex) {
      queryLocation.stopIndex = newStopIndex;
    }
    return queryLocation;
  }

  enterDml_clause(ctx: any) {
    let queryLocation: TokenLocation = this._getClauseLocation(ctx);
    // Remove trailing ; and whitespace if it exists to match other SQL dialects
    queryLocation = this._getClauseLocationWithoutTrailingSemicolon(queryLocation);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

  enterDdl_clause(ctx: any) {
    let queryLocation: TokenLocation = this._getClauseLocation(ctx);
    // Remove trailing ; and whitespace if it exists to match other SQL dialects
    queryLocation = this._getClauseLocationWithoutTrailingSemicolon(queryLocation);
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
    const referencedTable = this.parseContextToReferencedTable(ctx);
    let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
  }

  exitTable_alias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = this.parseContextToReferencedTable(ctx._parent._parent.children[0].children[0]);
    let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(this.unquote(aliasLocation.getToken(this.input)), referencedTable.tableName);
  }

  exitColumn_elem(ctx) {
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
    } else {
      columnName = this.unquote(columnName);
    }
    parsedQuery._addOutputColumn(columnName, tableNameOrAlias);
  }

  exitFull_column_name(ctx) {
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
    } else {
      columnName = this.unquote(columnName);
    }
    parsedQuery._addReferencedColumn(columnName, tableNameOrAlias, columnLocation);
  }

  exitAsterisk(ctx) {
    this.exitColumn_elem(ctx);
  }

  exitExpression_elem(ctx) {
    if (ctx.children[0] instanceof TSQLGrammar.ExpressionContext) {
      return this.exitColumn_elem(ctx.children[0]);
    } else if (ctx.children.length > 1) {
      return this.exitColumn_elem(ctx.children[ctx.children.length - 1]);
    }
  }

} 