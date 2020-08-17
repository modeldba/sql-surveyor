import { TokenLocation } from '../models/TokenLocation';
import { ParsedSql } from '../models/ParsedSql';

export class BaseSqlQueryListener {
  
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
  
}