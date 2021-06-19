import { ParsedSql } from "./models/ParsedSql";
import { TSqlQueryListener } from "./parsing/TSQLQueryListener";
import { TokenLocation } from "./models/TokenLocation";
import { TrackingErrorStrategy } from "./parsing/TrackingErrorStrategy";
import { PlSqlQueryListener } from "./parsing/PlSqlQueryListener";
import { MySQLQueryListener } from "./parsing/MySQLQueryListener";
import { BaseSqlQueryListener } from "./parsing/BaseSqlQueryListener";
import { PLpgSQLQueryListener } from "./parsing/PLpgSQLQueryListener";
import { antlr4tsSQL, SQLDialect, ParseTreeWalker, PredictionMode, CommonTokenStream, Parser, Token } from 'antlr4ts-sql';
import { TokenTypeIdentifier } from "./lexing/TokenTypeIdentifier";
import { SQLSurveyorOptions } from "./SQLSurveyorOptions";

export class SQLSurveyor {

  _dialect: SQLDialect;
  _antlr4tssql: antlr4tsSQL;
  _options: SQLSurveyorOptions;

  constructor(dialect: SQLDialect, options?: SQLSurveyorOptions) {
    this._dialect = dialect;
    if (this._dialect === null || this._dialect === undefined) {
      this._dialect = SQLDialect.TSQL;
    }
    this._antlr4tssql = new antlr4tsSQL(this._dialect);
    this._options = null;
    if (options !== null && options !== undefined) {
      this._options = options;
    }
  }

  setDialect(dialect: SQLDialect): void {
    this._dialect = dialect;
    this._antlr4tssql = new antlr4tsSQL(this._dialect);
  }

  survey(sqlScript: string): ParsedSql {
    let removedTrailingPeriod: boolean = false;
    if (sqlScript.endsWith('.') && this._dialect === SQLDialect.MYSQL) {
      // The MySQL Parser struggles with trailing '.' on incomplete SQL statements
      sqlScript = sqlScript.substring(0, sqlScript.length - 1);
      removedTrailingPeriod = true;
    }
    const tokens = this._getTokens(sqlScript);
    const parser = this._getParser(tokens);
    const parsedTree = this._antlr4tssql.getParseTree(parser);
    const listener = this._getListener(sqlScript);
    
    // Populate the parsedSql object on the listener
    try {
      // @ts-ignore Weak Type Detection
      ParseTreeWalker.DEFAULT.walk(listener, parsedTree);
    } catch (e) {
      // We'll attempt to complete surveying
      // console.error(e);
    }
    for (const parsedQuery of Object.values(listener.parsedSql.parsedQueries)) {
      parsedQuery._consolidateTables();
    }
    
    // Load the tokens
    const tokenTypeIdentifier = new TokenTypeIdentifier(this._dialect, parser);
    for (const commonToken of tokens.getTokens() as any[]) {
      if (commonToken.channel !== Token.HIDDEN_CHANNEL) {
        const tokenLocation: TokenLocation = new TokenLocation(commonToken._line, commonToken._line, commonToken.start, commonToken.stop);
        let parsedQuery = listener.parsedSql.getQueryAtLocation(commonToken.start);
        if (parsedQuery !== null) {
          const token = tokenLocation.getToken(sqlScript);
          while (parsedQuery !== null) {
            if (token.length > 0) {
              parsedQuery._addToken(tokenLocation, tokenTypeIdentifier.getTokenType(commonToken.type), token);
            }
            let subParsedQuery = parsedQuery._getCommonTableExpressionAtLocation(commonToken.start);
            if (subParsedQuery === null) {
              subParsedQuery = parsedQuery._getSubqueryAtLocation(commonToken.start);
            }
            parsedQuery = subParsedQuery;
          }
        }
      }
    }

    if (removedTrailingPeriod) {
      let parsedQuery = listener.parsedSql.getQueryAtLocation(sqlScript.length);
      if (parsedQuery !== null && Object.keys(parsedQuery.tokens).length > 0) {
        const queryTokens = Object.values(parsedQuery.tokens);
        const lastToken = queryTokens[queryTokens.length - 1];
        parsedQuery._addToken(new TokenLocation(lastToken.location.lineStart, lastToken.location.lineEnd, lastToken.location.stopIndex + 1, lastToken.location.stopIndex + 1), lastToken.type, '.');
      }
    }

    // Load the names of any Common Table Expressions
    Object.values(listener.parsedSql.parsedQueries).forEach(parsedQuery => parsedQuery._setCommonTableExpressionNames());

    // Set any errors
    for (const error of (parser.errorHandler as TrackingErrorStrategy).errors) {
      error.token.setValue(sqlScript);
      const parsedQuery = listener.parsedSql.getQueryAtLocation(error.token.location.startIndex);
      if (parsedQuery === null) {
        // Nothing to add the error to
        continue;
      }
      parsedQuery.queryErrors.push(error);
    }

    return listener.parsedSql;
  }

  _getTokens(sqlScript: string): CommonTokenStream {
    const tokens = this._antlr4tssql.getTokens(sqlScript, []);
    return tokens;
  }

  _getParser(tokens: CommonTokenStream): Parser {
    let parser = this._antlr4tssql.getParser(tokens, []);
    parser.errorHandler = new TrackingErrorStrategy();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    return parser;
  }

  _getListener(sqlScript: string): BaseSqlQueryListener {
    if (this._dialect === SQLDialect.TSQL) {
      return new TSqlQueryListener(sqlScript, this._options);
    } else if (this._dialect === SQLDialect.PLSQL) {
      return new PlSqlQueryListener(sqlScript, this._options);
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return new PLpgSQLQueryListener(sqlScript, this._options);
    } else if (this._dialect === SQLDialect.MYSQL) {
      return new MySQLQueryListener(sqlScript, this._options);
    }
    return null;
  }

}
