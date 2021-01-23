import { PLpgSQLParserListener, PLpgSQLGrammar } from 'antlr4ts-sql';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { ReferencedTable } from '../models/ReferencedTable';

export class PLpgSQLQueryListener extends BaseSqlQueryListener implements PLpgSQLParserListener {

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

  enterData_statement(ctx: any) {
    try {
      if (!(ctx._parent instanceof PLpgSQLGrammar.With_queryContext)) { // Ignore the trailing portion of a CTE query
        const queryLocation: TokenLocation = this._getClauseLocation(ctx);
        this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
      }
    } catch (err) {
      this._handleError(err);
    }
  }

  enterSchema_statement(ctx: any) {
    try {
      const queryLocation: TokenLocation = this._getClauseLocation(ctx);
      this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterScript_statement(ctx: any) {
    try {
      const queryLocation: TokenLocation = this._getClauseLocation(ctx);
      this.parsedSql._addQuery(new ParsedQuery(null, queryLocation.getToken(this.input), queryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterSelect_stmt_no_parens(ctx: any) {
    try {
      const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterWith_query(ctx: any) {
    try {
      const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
      parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  exitSchema_qualified_name(ctx: any) {
    try {
      const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      const referencedTable = this.parseContextToReferencedTable(ctx);
      let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
      parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitAlias_clause(ctx: any) {
    try {
      if (ctx._alias !== null && ctx._alias !== undefined) {
        const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
        const referencedTable = this.parseContextToReferencedTable(ctx._parent.children[0]);
        let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
        parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
        let aliasName = this.unquote(aliasLocation.getToken(this.input));
        const aliasStartIndex = this._getAliasStartIndex(aliasName);
        if (aliasStartIndex !== null) {
          // alias is in the format 'AS alias', ignore the 'AS '
          aliasName = aliasName.substring(aliasStartIndex);
        }
        parsedQuery._addAliasForTable(aliasName, referencedTable.tableName);
      }
    } catch (err) {
      this._handleError(err);
    }
  }

  exitIndirection_var(ctx: any) {
    try {
      let parentContext = ctx._parent;
      while (parentContext !== undefined) {
        if (parentContext instanceof PLpgSQLGrammar.Select_sublistContext) {
          // This is an output column, don't record it as a referenced column
          return;
        } else if (parentContext instanceof PLpgSQLGrammar.Select_stmt_no_parensContext) {
          // This is a subquery in the SELECT list, add the referenced column
          break;
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
    } catch (err) {
      this._handleError(err);
    }
  }

  exitIndirection_identifier(ctx: any) {
    try {
      this.exitIndirection_var(ctx);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitSelect_sublist(ctx: any) {
    try {
      let columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
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
          columnLocation = functionArgumentLocation;
        }
        const tableNameOrAliasStopIndex = this._getTableAliasEndLocation(columnText);
        if (tableNameOrAliasStopIndex !== null) {
          tableNameOrAlias = this.unquote(columnText.substring(0, tableNameOrAliasStopIndex));
          const tableNameOrAliasLocation = new TokenLocation(columnLocation.lineStart, columnLocation.lineEnd, columnLocation.startIndex, columnLocation.startIndex + tableNameOrAliasStopIndex - 1);
          parsedQuery._addTableNameLocation(tableNameOrAlias, tableNameOrAliasLocation, null, null);
        }
      }
      columnName = columnName.trim();
      const aliasStartIndex = this._getAliasStartIndex(columnName);
      if (aliasStartIndex !== null) {
        // Column has an alias
        columnAlias = columnName.substring(aliasStartIndex);
        columnName = columnName.substring(0, aliasStartIndex - 1).trimEnd();
        if (columnName.toUpperCase().endsWith('AS')) {
          columnName = columnName.substring(0, columnName.length - 2).trimEnd();
        }
      }
      columnName = this.unquote(columnName);
      if (columnAlias !== null) {
        columnAlias = this.unquote(columnAlias);
      }
      parsedQuery._addOutputColumn(columnName, columnAlias, tableNameOrAlias);
    } catch (err) {
      this._handleError(err);
    }
  }

  _getFunctionArgumentLocation(ctx: any, columnLocation: TokenLocation): TokenLocation {
    const functionRules = [PLpgSQLGrammar.Function_callContext];
    const argumentRules = [PLpgSQLGrammar.Vex_or_named_notationContext];
    return super._getFunctionArgumentLocation(ctx, columnLocation, functionRules, argumentRules);
  }

}