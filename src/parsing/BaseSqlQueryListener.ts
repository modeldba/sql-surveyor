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

  getAliasStartIndex(value: string, dbmsOpenQuoteChar: string, dbmsCloseQuoteChar: string): number {
    let isInsideStringQuote = false;
    let isInsideDBMSQuote = false;
    let index = value.length - 1;
    let isWhitespaceRegex = /\s/;
    while (index >= 0) {
      const currentChar = value[index];
      if (currentChar === "'" && value[index - 1] !== '\\') {
        isInsideStringQuote = !isInsideStringQuote;
      }
      if (currentChar === dbmsCloseQuoteChar && value[index - 1] !== '\\') {
        isInsideDBMSQuote = true;
      } else if (currentChar === dbmsOpenQuoteChar && value[index - 1] !== '\\') {
        isInsideDBMSQuote = false;
      }
      if (currentChar === ')' && !isInsideStringQuote && !isInsideDBMSQuote) {
        // Subquery without alias
        return null;
      }
      if (isWhitespaceRegex.test(currentChar) && !isInsideStringQuote && !isInsideDBMSQuote) {
        return index + 1;
      }
      index--;
    }
    return null;
  }
  
}