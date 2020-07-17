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

  enterDml_clause(ctx: any) {
    const queryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

  exitTable_name(ctx: any) {
    const tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = ParseHelpers.parseContextToReferencedTable(ctx, this.input);
    const parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(referencedTable.tableName, tableLocation, referencedTable.schemaName, referencedTable.databaseName);
  }

  exitTable_alias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const referencedTable = ParseHelpers.parseContextToReferencedTable(ctx._parent._parent.children[0].children[0], this.input);
    const parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(aliasLocation.getToken(this.input), referencedTable.tableName);
  }

  exitSubquery(ctx: any) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    // TODO
  }

  exitColumn_elem(ctx) {
    // console.dir(ctx.children);
  }

  visitTerminal(node) {
    const tokenLocation: TokenLocation = new TokenLocation(node._symbol._line, node._symbol._line, node._symbol.start, node._symbol.stop);
    const parsedQuery = this.parsedSql.getQueryAtLocation(tokenLocation.startIndex);
    const token = tokenLocation.getToken(this.input);
    if (token.length > 0) {
      parsedQuery._addToken(tokenLocation, token);
    }
  }

} 