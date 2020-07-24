import { SQLDialect } from "./models/SQLDialect";
import { ParsedSql } from "./models/ParsedSql";
import {CaseChangingStream} from './parsing/CaseChangingStream';
import {TSqlQueryListener} from "./parsing/TSQLQueryListener";
import {TSqlParser} from '../output/tsql/TSqlParser';
import {TSqlLexer} from '../output/tsql/TSqlLexer';
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener, Parser, BufferedTokenStream, CommonToken, Token } from 'antlr4ts';
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { TokenLocation } from "..";
import { CodeCompletionCore, SymbolTable } from "antlr4-c3";
import { AutocompleteOption } from "./models/AutocompleteOption";
import { AutocompleteOptionType } from "./models/AutocompleteOptionType";
import { WhitespaceLexer } from "./parsing/WhitespaceLexer";

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
    const parsedTree = (parser as TSqlParser).tsql_file();
    const listener = new TSqlQueryListener(sqlScript);
    
    // Populate the parsedSql object on the listener
    // @ts-ignore Weak Type Detection
    ParseTreeWalker.DEFAULT.walk(listener, parsedTree);
    
    // Load the tokens
    for (const commonToken of tokens.getTokens() as any[]) {
      const tokenLocation: TokenLocation = new TokenLocation(commonToken._line, commonToken._line, commonToken.start, commonToken.stop);
      const parsedQuery = listener.parsedSql.getQueryAtLocation(commonToken.start);
      const token = tokenLocation.getToken(sqlScript);
      if (token.length > 0 && parsedQuery !== null) {
          parsedQuery._addToken(tokenLocation, token);
      }
    }
    return listener.parsedSql;
  }

  autocomplete(sqlScript: string, atIndex?: number): AutocompleteOption[] {
    const tokens = this._getTokens(sqlScript);
    const parser = this._getParser(tokens);
    const core = new CodeCompletionCore(parser);
    const preferredRulesTable = [
      TSqlParser.RULE_table_name,
      TSqlParser.RULE_table_name_with_hint,
      TSqlParser.RULE_full_table_name,
      TSqlParser.RULE_table_source
    ];
    const preferredRulesColumn = [
      TSqlParser.RULE_column_elem,
      TSqlParser.RULE_column_alias,
      TSqlParser.RULE_full_column_name,
      TSqlParser.RULE_full_column_name_list,
      TSqlParser.RULE_column_name_list,
      TSqlParser.RULE_column_name_list_with_order,
      TSqlParser.RULE_output_column_name,
      TSqlParser.RULE_column_declaration
    ];
    core.preferredRules = new Set([
      ...preferredRulesColumn,
      ...preferredRulesTable
    ]);
    let indexToAutocomplete = sqlScript.length - 1;
    if (atIndex !== null && atIndex !== undefined) {
      indexToAutocomplete = atIndex;
    }
    const whitespaceLexer = new WhitespaceLexer(sqlScript);
    const allTokens = new CommonTokenStream(whitespaceLexer);
    const tokenIndex = this.getTokenIndexAt(allTokens.getTokens(), indexToAutocomplete);
    if (tokenIndex === null) {
      return null;
    }
    const token: any = allTokens.getTokens()[tokenIndex];
    const tokenLocation = new TokenLocation(token._line, token._line, token.start, token.stop);
    const tokenString = tokenLocation.getToken(sqlScript);
    tokens.getTokens(); // Needed for CoreCompletionCore to process correctly, see: https://github.com/mike-lischke/antlr4-c3/issues/42
    const candidates = core.collectCandidates(tokenIndex);
    const autocompleteOptions: AutocompleteOption[] = [];
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
        candidateTokenValue += ' ' + followOnTokenValue;
      }
      if (tokenString.length === 0 || candidateTokenValue.startsWith(tokenString.toUpperCase())) {
        autocompleteOptions.push(new AutocompleteOption(candidateTokenValue, AutocompleteOptionType.KEYWORD));
      }
    }
    let isTableCandidatePosition = false;
    let isColumnCandidatePosition = false;
    for (const rule of candidates.rules) {
      if (preferredRulesTable.includes(rule[0])) {
        isTableCandidatePosition = true;
      } else if (preferredRulesColumn.includes(rule[0])) {
        isColumnCandidatePosition = true;
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
    const lexer = new TSqlLexer(caseChangingCharStream);
    const tokens = new CommonTokenStream(lexer);
    return tokens;
  }

  _getParser(tokens: CommonTokenStream): Parser {
    const parser = new TSqlParser(tokens);
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    return parser;
  }

  getTokenIndexAt(tokens: any[], offset: number): number {
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
    return lastNonEOFToken;
  }

}
