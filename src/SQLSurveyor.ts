// import { SQLDialect } from "./models/SQLDialect";
import { ParsedSql } from "./models/ParsedSql";
import {TSqlQueryListener} from "./parsing/TSQLQueryListener";
import { CommonTokenStream, ConsoleErrorListener, Parser, Token } from 'antlr4ts';
// import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { TokenLocation } from "./models/TokenLocation";
import { CodeCompletionCore } from "antlr4-c3";
import { AutocompleteOption } from "./models/AutocompleteOption";
import { AutocompleteOptionType } from "./models/AutocompleteOptionType";
import { SimpleSQLLexer } from "./parsing/SimpleSQLLexer";
import { TrackingErrorStrategy } from "./parsing/TrackingErrorStrategy";
import { PlSqlQueryListener } from "./parsing/PlSqlQueryListener";
import { MySQLQueryListener } from "./parsing/MySQLQueryListener";
import { BaseSqlQueryListener } from "./parsing/BaseSqlQueryListener";
import { PLpgSQLQueryListener } from "./parsing/PLpgSQLQueryListener";
import { antlr4tsSQL, SQLDialect, TSQLGrammar, MySQLGrammar, PlSQLGrammar, PLpgSQLGrammar, ParseTreeWalker } from 'antlr4ts-sql';

export class SQLSurveyor {

  _dialect: SQLDialect;
  _antlr4tssql: antlr4tsSQL;

  constructor(dialect: SQLDialect) {
    this._dialect = dialect;
    if (this._dialect === null || this._dialect === undefined) {
      this._dialect = SQLDialect.TSQL;
    }
    this._antlr4tssql = new antlr4tsSQL(this._dialect);
  }

  survey(sqlScript: string): ParsedSql {
    let removedTrailingPeriod: boolean = false;
    if (sqlScript.endsWith('.') && this._dialect === SQLDialect.MYSQL) {
      // The MySQL Parser struggles with trailing '.' on incomplete SQL statements
      sqlScript = sqlScript.substring(0, sqlScript.length - 1);
      removedTrailingPeriod = true;
    }
    const tokens = this._antlr4tssql.getTokens(sqlScript);
    const parser = this._getParser(tokens);
    const parsedTree = this._antlr4tssql.getParseTree(parser);
    const listener = this._getListener(sqlScript);
    
    // Populate the parsedSql object on the listener
    // @ts-ignore Weak Type Detection
    ParseTreeWalker.DEFAULT.walk(listener, parsedTree);
    for (const parsedQuery of Object.values(listener.parsedSql.parsedQueries)) {
      parsedQuery._consolidateTables();
    }
    
    // Load the tokens
    for (const commonToken of tokens.getTokens() as any[]) {
      if (commonToken.channel !== Token.HIDDEN_CHANNEL) {
        const tokenLocation: TokenLocation = new TokenLocation(commonToken._line, commonToken._line, commonToken.start, commonToken.stop);
        let parsedQuery = listener.parsedSql.getQueryAtLocation(commonToken.start);
        const token = tokenLocation.getToken(sqlScript);
        while (parsedQuery !== null) {
          if (token.length > 0) {
            parsedQuery._addToken(tokenLocation, token);
          }
          let subParsedQuery = parsedQuery._getCommonTableExpressionAtLocation(commonToken.start);
          if (subParsedQuery === null) {
            subParsedQuery = parsedQuery._getSubqueryAtLocation(commonToken.start);
          }
          parsedQuery = subParsedQuery;
        }
      }
    }

    if (removedTrailingPeriod) {
      let parsedQuery = listener.parsedSql.getQueryAtLocation(sqlScript.length);
      if (parsedQuery !== null && Object.keys(parsedQuery.tokens).length > 0) {
        const tokens = Object.values(parsedQuery.tokens);
        const lastToken = tokens[tokens.length - 1];
        parsedQuery._addToken(new TokenLocation(lastToken.location.lineStart, lastToken.location.lineEnd, lastToken.location.stopIndex + 1, lastToken.location.stopIndex + 1), '.');
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

  autocomplete(sqlScript: string, atIndex?: number): AutocompleteOption[] {
    if (atIndex !== undefined && atIndex !== null) {
      // Remove everything after the index we want to get suggestions for,
      // it's not needed and keeping it in may impact which token gets selected for prediction
      sqlScript = sqlScript.substring(0, atIndex);
    }
    const tokens = this._antlr4tssql.getTokens(sqlScript);
    const parser = this._getParser(tokens);
    const core = new CodeCompletionCore(parser);
    const preferredRulesTable = this._getPreferredRulesForTable();
    const preferredRulesColumn = this._getPreferredRulesForColumn();
    const preferredRuleOptions = [preferredRulesTable, preferredRulesColumn];
    const ignoreTokens = this._getTokensToIgnore();
    core.ignoredTokens = new Set(ignoreTokens);
    let indexToAutocomplete = sqlScript.length - 1;
    if (atIndex !== null && atIndex !== undefined) {
      indexToAutocomplete = atIndex;
    }
    const simpleSQLLexer = new SimpleSQLLexer(sqlScript, this._tokenizeWhitespace());
    const allTokens = new CommonTokenStream(simpleSQLLexer);
    const tokenIndex = this._getTokenIndexAt(allTokens.getTokens(), sqlScript, indexToAutocomplete);
    if (tokenIndex === null) {
      return null;
    }
    const token: any = allTokens.getTokens()[tokenIndex];
    const tokenString = this._getTokenString(token, sqlScript, indexToAutocomplete);
    tokens.getTokens(); // Needed for CoreCompletionCore to process correctly, see: https://github.com/mike-lischke/antlr4-c3/issues/42
    const autocompleteOptions: AutocompleteOption[] = [];
    // Depending on the SQL grammar, we may not get both Tables and Column rules,
    // even if both are viable options for autocompletion
    // So, instead of using all preferredRules at once, we'll do them separate
    let isTableCandidatePosition = false;
    let isColumnCandidatePosition = false;
    for (const preferredRules of preferredRuleOptions) {
      core.preferredRules = new Set(preferredRules);
      const candidates = core.collectCandidates(tokenIndex);
      for (const candidateToken of candidates.tokens) {
        let candidateTokenValue = parser.vocabulary.getDisplayName(candidateToken[0]);
        if (this._dialect === SQLDialect.MYSQL && candidateTokenValue.endsWith('_SYMBOL')) {
          candidateTokenValue = candidateTokenValue.substring(0, candidateTokenValue.length - 7);
        }
        if (candidateTokenValue.startsWith("'") && candidateTokenValue.endsWith("'")) {
          candidateTokenValue = candidateTokenValue.substring(1, candidateTokenValue.length - 1);
        }
        let followOnTokens = candidateToken[1];
        for (const followOnToken of followOnTokens) {
          let followOnTokenValue = parser.vocabulary.getDisplayName(followOnToken);
          if (followOnTokenValue.startsWith("'") && followOnTokenValue.endsWith("'")) {
            followOnTokenValue = followOnTokenValue.substring(1, followOnTokenValue.length - 1);
          }
          if (!(followOnTokenValue.length === 1 && /[^\w\s]/.test(followOnTokenValue))) {
            candidateTokenValue += ' ';
          }
          candidateTokenValue += followOnTokenValue;
        }
        if (tokenString.length === 0 || (candidateTokenValue.startsWith(tokenString.toUpperCase()) && autocompleteOptions.find(option => option.value === candidateTokenValue) === undefined)) {
          autocompleteOptions.push(new AutocompleteOption(candidateTokenValue, AutocompleteOptionType.KEYWORD));
        }
      }
      for (const rule of candidates.rules) {
        if (preferredRulesTable.includes(rule[0])) {
          isTableCandidatePosition = true;
        }
        if (preferredRulesColumn.includes(rule[0])) {
          isColumnCandidatePosition = true;
        }
      }
    } 
    if (isTableCandidatePosition) {
      autocompleteOptions.unshift(new AutocompleteOption(null, AutocompleteOptionType.TABLE));
    }
    if (isColumnCandidatePosition) {
      autocompleteOptions.unshift(new AutocompleteOption(null, AutocompleteOptionType.COLUMN));
    }
    return autocompleteOptions;
  }

  _getParser(tokens: CommonTokenStream): Parser {
    let parser = this._antlr4tssql.getParser(tokens);
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    parser.errorHandler = new TrackingErrorStrategy();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    return parser;
  }

  _getListener(sqlScript: string): BaseSqlQueryListener {
    if (this._dialect === SQLDialect.TSQL) {
      return new TSqlQueryListener(sqlScript);
    } else if (this._dialect === SQLDialect.PLSQL) {
      return new PlSqlQueryListener(sqlScript);
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return new PLpgSQLQueryListener(sqlScript);
    } else if (this._dialect === SQLDialect.MYSQL) {
      return new MySQLQueryListener(sqlScript);
    }
    return null;
  }

  _getTokenIndexAt(tokens: any[], fullString: string, offset: number): number {
    if (tokens.length === 0) {
      return null;
    }
    let i: number = 0
    let lastNonEOFToken: number = null;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token.type !== Token.EOF) {
        lastNonEOFToken = i;
      } 
      if (token.start > offset) {
        if (i === 0) {
          return null;
        }
        return i - 1;
      }
      i++;
    }
    // If we didn't find the token above and the last
    // character in the autocomplete is whitespace, 
    // start autocompleting for the next token
    if (/\s$/.test(fullString)) {
      return i - 1;
    }
    return lastNonEOFToken;
  }

  _getTokenString(token: any, fullString: string, offset: number): string {
    if (token !== null && token.type !== Token.EOF) {
      let stop = token.stop;
      if (offset - 1 < stop) {
        stop = offset - 1;
      }
      const tokenLocation = new TokenLocation(token._line, token._line, token.start, stop);
      return tokenLocation.getToken(fullString);
    }
    return '';
  }

  _tokenizeWhitespace() {
    if (this._dialect === SQLDialect.TSQL) {
      return false; // TSQL grammar SKIPs whitespace
    } else if (this._dialect === SQLDialect.PLSQL) {
      return true;
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return true;
    } else if (this._dialect === SQLDialect.MYSQL) {
      return true;
    }
    return true;
  }

  _getPreferredRulesForTable(): number[] {
    if (this._dialect === SQLDialect.TSQL) {
      return [
        TSQLGrammar.TSqlParser.RULE_table_name,
        TSQLGrammar.TSqlParser.RULE_table_name_with_hint,
        TSQLGrammar.TSqlParser.RULE_full_table_name,
        TSQLGrammar.TSqlParser.RULE_table_source
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MySQLGrammar.MultiQueryMySQLParser.RULE_tableRef,
        MySQLGrammar.MultiQueryMySQLParser.RULE_fieldIdentifier
      ]
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSQLGrammar.PlSqlParser.RULE_tableview_name,
        PlSQLGrammar.PlSqlParser.RULE_table_element
      ]
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLGrammar.PLpgSQLParser.RULE_schema_qualified_name,
        PLpgSQLGrammar.PLpgSQLParser.RULE_indirection_var
      ];
    }
    return [];
  }

  _getPreferredRulesForColumn(): number[] {
    if (this._dialect === SQLDialect.TSQL) {
      return [
        TSQLGrammar.TSqlParser.RULE_column_elem,
        TSQLGrammar.TSqlParser.RULE_column_alias,
        TSQLGrammar.TSqlParser.RULE_full_column_name,
        TSQLGrammar.TSqlParser.RULE_full_column_name_list,
        TSQLGrammar.TSqlParser.RULE_column_name_list,
        TSQLGrammar.TSqlParser.RULE_column_name_list_with_order,
        TSQLGrammar.TSqlParser.RULE_output_column_name,
        TSQLGrammar.TSqlParser.RULE_column_declaration
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MySQLGrammar.MultiQueryMySQLParser.RULE_columnRef
      ];
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSQLGrammar.PlSqlParser.RULE_column_name,
        PlSQLGrammar.PlSqlParser.RULE_general_element
      ];
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLGrammar.PLpgSQLParser.RULE_indirection_var,
        PLpgSQLGrammar.PLpgSQLParser.RULE_indirection_identifier
      ];
    }
    return [];
  }

  _getTokensToIgnore(): number[] {
    if (this._dialect === SQLDialect.TSQL) {
      return [
        TSQLGrammar.TSqlParser.DOT,
        TSQLGrammar.TSqlParser.COMMA,
        TSQLGrammar.TSqlParser.ID,
        TSQLGrammar.TSqlParser.LR_BRACKET,
        TSQLGrammar.TSqlParser.RR_BRACKET
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MySQLGrammar.MultiQueryMySQLParser.DOT_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.COMMA_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.SEMICOLON_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.IDENTIFIER,
        MySQLGrammar.MultiQueryMySQLParser.OPEN_PAR_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.CLOSE_PAR_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.OPEN_CURLY_SYMBOL,
        MySQLGrammar.MultiQueryMySQLParser.CLOSE_CURLY_SYMBOL
      ];
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSQLGrammar.PlSqlParser.PERIOD,
        PlSQLGrammar.PlSqlParser.COMMA,
        PlSQLGrammar.PlSqlParser.SEMICOLON,
        PlSQLGrammar.PlSqlParser.DOUBLE_PERIOD,
        PlSQLGrammar.PlSqlParser.IDENTIFIER,
        PlSQLGrammar.PlSqlParser.LEFT_PAREN,
        PlSQLGrammar.PlSqlParser.RIGHT_PAREN
      ];
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLGrammar.PLpgSQLParser.DOT,
        PLpgSQLGrammar.PLpgSQLParser.COMMA,
        PLpgSQLGrammar.PLpgSQLParser.SEMI_COLON,
        PLpgSQLGrammar.PLpgSQLParser.DOUBLE_DOT,
        PLpgSQLGrammar.PLpgSQLParser.Identifier,
        PLpgSQLGrammar.PLpgSQLParser.LEFT_PAREN,
        PLpgSQLGrammar.PLpgSQLParser.RIGHT_PAREN,
        PLpgSQLGrammar.PLpgSQLParser.LEFT_BRACKET,
        PLpgSQLGrammar.PLpgSQLParser.RIGHT_BRACKET
      ];
    }
    return [];
  }

}
