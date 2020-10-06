import { MultiQueryMySQLParserListener, MySQLGrammar } from 'antlr4ts-sql';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { ReferencedTable } from '../models/ReferencedTable';

export class MySQLQueryListener extends BaseSqlQueryListener implements MultiQueryMySQLParserListener {

  unquote(value: string) {
    if (value.startsWith('`') && value.endsWith('`')) {
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

  _addDMLQuery(ctx) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

  enterSimpleStatement(ctx) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
  }

  // DML
  enterCallStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterDeleteStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterDoStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterHandlerStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterInsertStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterLoadStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterReplaceStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterSelectStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterUpdateStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterTransactionOrLockingStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterReplicationStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterPreparedStatement(ctx) {
    this._addDMLQuery(ctx);
  }

  enterCommonTableExpression(ctx: any) {
    const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
    parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
  }

  enterSubquery(ctx: any) {
    // Don't include opening and closing parentheses
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start + 1, ctx._stop.stop - 1);
    if (!(ctx._parent instanceof MySQLGrammar.CommonTableExpressionContext)) {
      let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
    }
  }

  exitSelectItem(ctx: any) {
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

  exitSelectItemList(ctx: any) {
    const columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    if (columnLocation.getToken(this.input) === '*') {
      // Otherwise, the columns will be picked up by exitSelectItem on their own
      this.exitSelectItem(ctx);
    }
  }
  
  exitTableRef(ctx: any) {
    const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = this.parseContextToReferencedTable(ctx);
    let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
  }

  exitTableAlias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = this.parseContextToReferencedTable(ctx._parent.children[0]);
    let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
    let aliasName = this.unquote(aliasLocation.getToken(this.input));
    if (aliasName.includes(' ')) {
      // alias is in the format 'AS alias', ignore the 'AS '
      const aliasTextSplit: string[] = aliasName.split(' ');
      aliasName = this.unquote(aliasTextSplit[aliasTextSplit.length - 1]);
    }
    parsedQuery._addAliasForTable(aliasName, referencedTable.tableName);
  }

  exitColumnRef(ctx: any) {
    let parentContext = ctx._parent;
    while (parentContext !== undefined) {
      if (parentContext instanceof MySQLGrammar.SelectItemContext) {
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

}