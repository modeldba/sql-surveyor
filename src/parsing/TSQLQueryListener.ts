import { TSqlParserListener } from '../../output/tsql/TSqlParserListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedSql } from '../models/ParsedSql';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';
import { ParserRuleContext } from 'antlr4ts';

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
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation));
  }

  exitTable_name(ctx: any) {
    const tableLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const tableNameOrAlias: string = tableLocation.getToken(this.input);
    const parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(tableNameOrAlias, tableLocation);
  }

  exitTable_alias(ctx: any) {
    const aliasLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    const AsTableAliasLocation: TokenLocation = new TokenLocation(ctx._parent._start._line, ctx._parent._stop._line, ctx._parent._start.start, ctx._parent._stop.stop);
    const tableNameWithHintLocation: TokenLocation = new TokenLocation(ctx._parent._parent._start._line, ctx._parent._parent._stop._line, ctx._parent._parent._start.start, ctx._parent._parent._stop.stop);
    const tableNameLocation = new TokenLocation(ctx._parent._parent.children[0]._start._line, ctx._parent._parent.children[0]._stop._line, ctx._parent._parent.children[0]._start.start, ctx._parent._parent.children[0]._stop.stop);
    const parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(aliasLocation.getToken(this.input), tableNameLocation.getToken(this.input));
  }

  exitSubquery(ctx: any) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
    // TODO
  }

  exitColumn_elem(ctx) {
    console.dir(ctx.children);
  }

} 