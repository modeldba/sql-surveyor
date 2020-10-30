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

  _getAliasStartIndex(value: string, dbmsOpenQuoteChar: string, dbmsCloseQuoteChar: string): number {
    let isInsideStringQuote = false;
    let isInsideDBMSQuote = false;
    let index = value.length - 1;
    const isWhitespaceRegex = /\s/;
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

  _getTableAliasEndLocation(value: string, dbmsOpenQuoteChar: string, dbmsCloseQuoteChar: string): number {
    let isInsideStringQuote = false;
    let isInsideDBMSQuote = false;
    let index = 0;
    const isWhitespaceRegex = /\s/;
    let potentialTableAliasIndex = null;
    while (index < value.length) {
      const currentChar = value[index];
      if (currentChar === "'" && value[index - 1] !== '\\') {
        isInsideStringQuote = !isInsideStringQuote;
      }
      if (currentChar === dbmsCloseQuoteChar && value[index - 1] !== '\\') {
        isInsideDBMSQuote = true;
      } else if (currentChar === dbmsOpenQuoteChar && value[index - 1] !== '\\') {
        isInsideDBMSQuote = false;
      }
      if (isWhitespaceRegex.test(currentChar) && !isInsideStringQuote && !isInsideDBMSQuote) {
        // Either we're in a subquery, or have reached the column alias
        return potentialTableAliasIndex;
      }
      if (currentChar === '.' && !isInsideStringQuote && !isInsideDBMSQuote) {
        potentialTableAliasIndex = index;
      }
      index++;
    }
    return potentialTableAliasIndex;
  }

  _getFunctionArgumentLocation(ctx: any, columnLocation: TokenLocation, functionRules: any[], argumentRules: any[]): TokenLocation {
    while (ctx !== undefined && ctx.childCount > 0) {
      let currentChild = ctx.children[0];
      if (currentChild._start.start === columnLocation.startIndex
          && currentChild._stop.stop === columnLocation.stopIndex) {
        for (const functionRule of functionRules) {
          if (currentChild instanceof functionRule && currentChild.childCount > 0) {
            for (const argumentRule of argumentRules) {
              for (const child of currentChild.children) {
                if (child instanceof argumentRule) {
                  return new TokenLocation((child._start as any)._line, (child._stop as any)._line, (child._start as any).start, (child._stop as any).stop);
                }
              }
            }
          }
        }
      } else {
        return null;
      }
      ctx = currentChild;
    }
    return null;
  }
  
}