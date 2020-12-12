import { TokenType } from "../models/TokenType";
import { Parser, SQLDialect } from "antlr4ts-sql";

export class TokenTypeIdentifier {

  _dialect: SQLDialect;
  _parser: Parser;

  constructor(dialect: SQLDialect, parser: Parser) {
    this._dialect = dialect;
    this._parser = parser;
  }

  getTokenType(typeId: number): TokenType {
    if (this._dialect === SQLDialect.TSQL) {
      return this._getTSQLTokenType(typeId);
    } else if (this._dialect === SQLDialect.PLSQL) {
      return this._getPLSQLTokenType(typeId);
    } else if (this._dialect === SQLDialect.PLpgSQL) {
      return this._getPLpgSQLTokenType(typeId);
    } else if (this._dialect === SQLDialect.MYSQL) {
      return this._getMYSQLTokenType(typeId);
    }
    return null;
  }

  _getTSQLTokenType(typeId: number): TokenType {
    const displayName = this._parser.vocabulary.getDisplayName(typeId);
    const symbolicName = this._parser.vocabulary.getSymbolicName(typeId);
    if (symbolicName === 'ID' || symbolicName === 'SQUARE_BRACKET_ID') {
      return TokenType.IDENTIFIER;
    } else if (symbolicName.includes('COMMENT')) {
      return TokenType.COMMENT;
    } else if (displayName === symbolicName) {
      return TokenType.LITERAL;
    } else if (displayName.substring(1, displayName.length - 1) !== symbolicName) {
      return TokenType.OPERATOR;
    } else if (displayName.substring(1, displayName.length - 1) === symbolicName) {
      return TokenType.KEYWORD;
    }
    return null;
  }

  _getPLSQLTokenType(typeId: number): TokenType {
    const displayName = this._parser.vocabulary.getDisplayName(typeId);
    const symbolicName = this._parser.vocabulary.getSymbolicName(typeId);
    if (symbolicName === 'ID' || symbolicName === 'REGULAR_ID' || symbolicName === 'DELIMITED_ID') {
      return TokenType.IDENTIFIER;
    } else if (symbolicName.includes('COMMENT')) {
      return TokenType.COMMENT;
    } else if (displayName === symbolicName) {
      return TokenType.LITERAL;
    } else if (displayName.substring(1, displayName.length - 1) !== symbolicName) {
      return TokenType.OPERATOR;
    } else if (displayName.substring(1, displayName.length - 1) === symbolicName) {
      return TokenType.KEYWORD;
    }
    return null;
  }

  _getPLpgSQLTokenType(typeId: number): TokenType {
    const displayName = this._parser.vocabulary.getDisplayName(typeId);
    const symbolicName = this._parser.vocabulary.getSymbolicName(typeId);
    if (symbolicName === 'Identifier' || symbolicName === 'QuotedIdentifier') {
      return TokenType.IDENTIFIER;
    } else if (displayName !== symbolicName 
                || displayName === 'BeginDollarStringConstant' || displayName === 'EndDollarStringConstant') {
      return TokenType.OPERATOR;
    } else if (symbolicName.toUpperCase().includes('COMMENT')) {
      return TokenType.COMMENT;
    } else if (symbolicName.endsWith('_NUMBER') 
                || symbolicName.toUpperCase().endsWith('_LITERAL')
                || symbolicName === 'Text_between_Dollar') {
      return TokenType.LITERAL;
    } else if (symbolicName.toUpperCase() === symbolicName) {
      return TokenType.KEYWORD;
    }
    return null;
  }

  _getMYSQLTokenType(typeId: number): TokenType {
    const displayName = this._parser.vocabulary.getDisplayName(typeId);
    const symbolicName = this._parser.vocabulary.getSymbolicName(typeId);
    if (symbolicName === 'IDENTIFIER' || symbolicName === 'BACK_TICK_QUOTED_ID') {
      return TokenType.IDENTIFIER;
    } else if (symbolicName.endsWith('_OPERATOR') || (displayName !== symbolicName)) {
      return TokenType.OPERATOR;
    } else if (symbolicName.endsWith('_SYMBOL')) {
      return TokenType.KEYWORD;
    } else if (symbolicName.endsWith('_NUMBER') || symbolicName.endsWith('_TEXT')) {
      return TokenType.LITERAL;
    } else if (symbolicName.includes('_COMMENT')) {
      return TokenType.COMMENT;
    }
    return null;
  }

}