import { SQLDialect } from "./models/SQLDialect";
import { ParsedSql } from "./models/ParsedSql";
import {CaseChangingStream} from './parsing/CaseChangingStream';
import {TSqlQueryListener} from "./parsing/TSQLQueryListener";
import {TSqlParser, Tsql_fileContext} from '../output/tsql/TSqlParser';
import {TSqlLexer} from '../output/tsql/TSqlLexer';
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener, Parser, BufferedTokenStream, CommonToken, Token } from 'antlr4ts';
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { TokenLocation } from "./models/TokenLocation";
import { CodeCompletionCore, SymbolTable } from "antlr4-c3";
import { AutocompleteOption } from "./models/AutocompleteOption";
import { AutocompleteOptionType } from "./models/AutocompleteOptionType";
import { SimpleSQLLexer } from "./parsing/SimpleSQLLexer";
import { TrackingErrorStrategy } from "./parsing/TrackingErrorStrategy";
import { PlSqlParser } from "../output/plsql/PlSqlParser";
import { PlSqlLexer } from "../output/plsql/PlSqlLexer";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { PlSqlQueryListener } from "./parsing/PlSqlQueryListener";
import { MySQLQueryListener } from "./parsing/MySQLQueryListener";
import { BaseSqlQueryListener } from "./parsing/BaseSqlQueryListener";
import { MultiQueryMySQLParser } from "../output/mysql/MultiQueryMySQLParser";
import { MySQLLexer } from "../output/mysql/MySQLLexer";
import { PLpgSQLLexer } from "../output/plpgsql/PLpgSQLLexer";
import { PLpgSQLParser } from "../output/plpgsql/PLpgSQLParser";
import { PLpgSQLQueryListener } from "./parsing/PLpgSQLQueryListener";

export class SQLSurveyor {

  _dialect: SQLDialect;

  constructor(dialect: SQLDialect) {
    this._dialect = dialect;
    if (this._dialect === null || this._dialect === undefined) {
      this._dialect = SQLDialect.TSQL;
    }
  }

  survey(sqlScript: string): ParsedSql {
    const tokens = this._getTokens(sqlScript);
    const parser = this._getParser(tokens);
    const parsedTree = this._getParseTree(parser);
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
    const tokens = this._getTokens(sqlScript);
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

  _getTokens(sqlScript: string): CommonTokenStream {
    const chars = new ANTLRInputStream(sqlScript);
    const caseChangingCharStream = new CaseChangingStream(chars, true);
    let lexer = null;
    if (this._dialect === SQLDialect.TSQL) {
      lexer = new TSqlLexer(caseChangingCharStream);
    } else if (this._dialect === SQLDialect.PLSQL) {
      lexer = new PlSqlLexer(caseChangingCharStream);
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      lexer = new PLpgSQLLexer(chars);
    } else if (this._dialect === SQLDialect.MYSQL) {
      lexer = new MySQLLexer(chars);
    }
    const tokens = new CommonTokenStream(lexer);
    return tokens;
  }

  _getParser(tokens: CommonTokenStream): Parser {
    let parser = null;
    if (this._dialect === SQLDialect.TSQL) {
      parser = new TSqlParser(tokens);
    } else if (this._dialect === SQLDialect.PLSQL) {
      parser = new PlSqlParser(tokens);
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      parser = new PLpgSQLParser(tokens);
    } else if (this._dialect === SQLDialect.MYSQL) {
      parser = new MultiQueryMySQLParser(tokens);
    }
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    parser.errorHandler = new TrackingErrorStrategy();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    return parser;
  }

  _getParseTree(parser: Parser): ParseTree {
    if (parser instanceof TSqlParser) {
      return parser.tsql_file();
    } else if (parser instanceof PlSqlParser) {
      return (parser as PlSqlParser).sql_script();
    } else if (parser instanceof PLpgSQLParser) {
      return (parser as PLpgSQLParser).sql();
    } else if (this._dialect === SQLDialect.MYSQL) {
      return (parser as MultiQueryMySQLParser).sql_script();
    }
    return null;
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
        TSqlParser.RULE_table_name,
        TSqlParser.RULE_table_name_with_hint,
        TSqlParser.RULE_full_table_name,
        TSqlParser.RULE_table_source
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MultiQueryMySQLParser.RULE_tableRef,
        MultiQueryMySQLParser.RULE_fieldIdentifier
      ]
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSqlParser.RULE_tableview_name,
        PlSqlParser.RULE_table_element
      ]
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLParser.RULE_schema_qualified_name,
        PLpgSQLParser.RULE_indirection_var
      ];
    }
    return [];
  }

  _getPreferredRulesForColumn(): number[] {
    if (this._dialect === SQLDialect.TSQL) {
      return [
        TSqlParser.RULE_column_elem,
        TSqlParser.RULE_column_alias,
        TSqlParser.RULE_full_column_name,
        TSqlParser.RULE_full_column_name_list,
        TSqlParser.RULE_column_name_list,
        TSqlParser.RULE_column_name_list_with_order,
        TSqlParser.RULE_output_column_name,
        TSqlParser.RULE_column_declaration
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MultiQueryMySQLParser.RULE_columnRef
      ];
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSqlParser.RULE_column_name,
        PlSqlParser.RULE_general_element
      ];
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLParser.RULE_indirection_var,
        PLpgSQLParser.RULE_indirection_identifier
      ];
    }
    return [];
  }

  _getTokensToIgnore(): number[] {
    if (this._dialect === SQLDialect.TSQL) {
      return [
        TSqlParser.DOT,
        TSqlParser.COMMA,
        TSqlParser.ID,
        TSqlParser.LR_BRACKET,
        TSqlParser.RR_BRACKET
      ];
    } else if (this._dialect === SQLDialect.MYSQL) {
      return [
        MultiQueryMySQLParser.DOT_SYMBOL,
        MultiQueryMySQLParser.COMMA_SYMBOL,
        MultiQueryMySQLParser.SEMICOLON_SYMBOL,
        MultiQueryMySQLParser.IDENTIFIER,
        MultiQueryMySQLParser.OPEN_PAR_SYMBOL,
        MultiQueryMySQLParser.CLOSE_PAR_SYMBOL,
        MultiQueryMySQLParser.OPEN_CURLY_SYMBOL,
        MultiQueryMySQLParser.CLOSE_CURLY_SYMBOL
      ];
    } else if (this._dialect === SQLDialect.PLSQL) {
      return [
        PlSqlParser.PERIOD,
        PlSqlParser.COMMA,
        PlSqlParser.SEMICOLON,
        PlSqlParser.DOUBLE_PERIOD,
        PlSqlParser.IDENTIFIER,
        PlSqlParser.LEFT_PAREN,
        PlSqlParser.RIGHT_PAREN
      ];
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return [
        PLpgSQLParser.DOT,
        PLpgSQLParser.COMMA,
        PLpgSQLParser.SEMI_COLON,
        PLpgSQLParser.DOUBLE_DOT,
        PLpgSQLParser.Identifier,
        PLpgSQLParser.LEFT_PAREN,
        PLpgSQLParser.RIGHT_PAREN,
        PLpgSQLParser.LEFT_BRACKET,
        PLpgSQLParser.RIGHT_BRACKET
      ];
    }
    return [];
  }

}
