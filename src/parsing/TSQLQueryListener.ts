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

  _getAliasStartIndex(value: string): number {
    return super._getAliasStartIndex(value, '[', ']');
  }

  _getTableAliasEndLocation(value: string): number {
    return super._getTableAliasEndLocation(value, '[', ']');
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
    try {
      let queryLocation: TokenLocation = this._getClauseLocation(ctx);
      // Remove trailing ; and whitespace if it exists to match other SQL dialects
      queryLocation = this._getClauseLocationWithoutTrailingSemicolon(queryLocation);
      this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterDdl_clause(ctx: any) {
    try {
      let queryLocation: TokenLocation = this._getClauseLocation(ctx);
      // Remove trailing ; and whitespace if it exists to match other SQL dialects
      queryLocation = this._getClauseLocationWithoutTrailingSemicolon(queryLocation);
      this.parsedSql._addQuery(new ParsedQuery(QueryType.DDL, queryLocation.getToken(this.input), queryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterSubquery(ctx: any) {
    try {
      const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      let parsedQuery = this.parsedSql.getQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(subqueryLocation.startIndex);
      parsedQuery._addSubQuery(new ParsedQuery(QueryType.DML, subqueryLocation.getToken(this.input), subqueryLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  enterCommon_table_expression(ctx: any) {
    try {
      const cteLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      let parsedQuery = this.parsedSql.getQueryAtLocation(cteLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(cteLocation.startIndex);
      parsedQuery._addCommonTableExpression(new ParsedQuery(QueryType.DML, cteLocation.getToken(this.input), cteLocation));
    } catch (err) {
      this._handleError(err);
    }
  }

  exitFull_table_name(ctx: any) {
    try {
      this.exitTable_name(ctx);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitTable_name(ctx: any) {
    try {
      let parentContext = ctx._parent;
      while (parentContext !== undefined) {
        if (parentContext instanceof TSQLGrammar.Select_list_elemContext) {
          // This is part of an output column, don't record it as a referenced table
          return;
        } else if (parentContext instanceof TSQLGrammar.SubqueryContext) {
          // This is a subquery in the SELECT list, add the referenced table
          break;
        }
        parentContext = parentContext._parent;
      }
      const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      const referencedTable = this.parseContextToReferencedTable(ctx);
      let parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(tableLocation.startIndex);
      parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitTable_alias(ctx: any) {
    try {
      const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      const referencedTable = this.parseContextToReferencedTable(ctx._parent._parent.children[0].children[0]);
      let parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
      parsedQuery = parsedQuery.getSmallestQueryAtLocation(aliasLocation.startIndex);
      parsedQuery._addAliasForTable(this.unquote(aliasLocation.getToken(this.input)), referencedTable.tableName);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitColumn_elem(ctx) {
    try {
      let columnLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      if (ctx._parent.children[1] instanceof TSQLGrammar.As_column_aliasContext) {
        columnLocation.lineEnd = (ctx._parent.children[1]._stop as any)._line;
        columnLocation.stopIndex = (ctx._parent.children[1]._stop as any).stop;
      }
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
    const functionRules = [TSQLGrammar.Aggregate_windowed_functionContext, TSQLGrammar.Analytic_windowed_functionContext, TSQLGrammar.Ranking_windowed_functionContext];
    const argumentRules = [TSQLGrammar.ExpressionContext, TSQLGrammar.All_distinct_expressionContext];
    return super._getFunctionArgumentLocation(ctx, columnLocation, functionRules, argumentRules);
  }

  exitFull_column_name(ctx) {
    try {
      let parentContext = ctx._parent;
      while (parentContext !== undefined) {
        if (parentContext instanceof TSQLGrammar.Column_elemContext) {
          // Column_elem will already handle this token
          // (not all Full_column_name are children of Column_elem)
          return;
        } else if (parentContext instanceof TSQLGrammar.Select_list_elemContext) {
          // This is an output column, don't record it as a referenced column
          return;
        } else if (parentContext instanceof TSQLGrammar.SubqueryContext) {
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

  exitAsterisk(ctx) {
    try {
      this.exitColumn_elem(ctx);
    } catch (err) {
      this._handleError(err);
    }
  }

  exitExpression_elem(ctx) {
    try {
      if (ctx.children[0] instanceof TSQLGrammar.ExpressionContext) {
        return this.exitColumn_elem(ctx.children[0]);
      } else if (ctx.children.length > 1) {
        return this.exitColumn_elem(ctx.children[ctx.children.length - 1]);
      }
    } catch (err) {
      this._handleError(err);
    }
  }

} 