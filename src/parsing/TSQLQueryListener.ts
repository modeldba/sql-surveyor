import { TSqlParserListener } from '../../output/tsql/TSqlParserListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedSql } from '../models/ParsedSql';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';

export default class extends TSqlParserListener {

  input: string;
  tableNameLocations: { [tableName: string]: TokenLocation[] };
  tableAlias: { [tableName: string]: string[] };

  parsedSql: ParsedSql;

  constructor(input: string) {
    super();
    this.input = input;
    this.tableNameLocations = {};
    this.tableAlias = {};

    this.parsedSql = new ParsedSql();
  }

  enterDml_clause(ctx) {
    const queryLocation: TokenLocation = new TokenLocation(ctx.start.line, ctx.stop.line, ctx.start.start, ctx.stop.stop);
    console.log(ctx.start.line + ' - ' + ctx.stop.line);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation));
  }

  exitTable_name(ctx) {
    const tableLocation: TokenLocation = new TokenLocation(ctx.start.line, ctx.stop.line, ctx.start.start, ctx.stop.stop);
    const tableNameOrAlias: string = tableLocation.getToken(this.input);
    const parsedQuery = this.parsedSql.getQueryAtLocation(tableLocation.startIndex);
    parsedQuery._addTableNameLocation(tableNameOrAlias, tableLocation);
  }

  exitTable_alias(ctx) {
    const aliasLocation = new TokenLocation(ctx.start.line, ctx.stop.line, ctx.start.start, ctx.stop.stop);
    const AsTableAliasLocation: TokenLocation = new TokenLocation(ctx.parentCtx.start.line, ctx.parentCtx.stop.line, ctx.parentCtx.start.start, ctx.parentCtx.stop.stop);
    const tableNameWithHintLocation: TokenLocation = new TokenLocation(ctx.parentCtx.parentCtx.start.line, ctx.parentCtx.parentCtx.stop.line, ctx.parentCtx.parentCtx.start.start, ctx.parentCtx.parentCtx.stop.stop);
    const tableNameLocation = new TokenLocation(ctx.parentCtx.parentCtx.children[0].start.line, ctx.parentCtx.parentCtx.children[0].stop.line, ctx.parentCtx.parentCtx.children[0].start.start, ctx.parentCtx.parentCtx.children[0].stop.stop);
    const parsedQuery = this.parsedSql.getQueryAtLocation(aliasLocation.startIndex);
    parsedQuery._addAliasForTable(aliasLocation.getToken(this.input), tableNameLocation.getToken(this.input));
  }

  exitSubquery(ctx) {
    const subqueryLocation: TokenLocation = new TokenLocation(ctx.start.line, ctx.stop.line, ctx.start.start, ctx.stop.stop);
    // TODO
  }

  exitColumn_elem(ctx) {
    console.dir(ctx.children);
  }

} 