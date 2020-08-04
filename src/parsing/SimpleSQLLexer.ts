import { TokenSource, Token, CharStream, TokenFactory, CommonToken } from "antlr4ts";

/**
 * A very simple lexer for splitting a string into tokens based on 
 * whitespace. Handles SQL quote characters (i.e. '). Also splits ; and . as separate tokens
 * 
 * THIS SHOULD NOT BE USED FOR MOST ANTLR4 TASKS.
 * 
 * It is designed to be used to find the correct token index at
 * any string location, regardless of the validity of the string.
 * See SQLSurveyer.getTokenIndexAt for usage.
 */
export class SimpleSQLLexer implements TokenSource {

  value: string;
  currentIndex: number;
  insideQuote: boolean;

  specialCharacters: string[] = [';', '.'];

  constructor(value: string) {
    this.value = value;
    this.currentIndex = 0;
    this.insideQuote = false;
  }

  nextToken(): Token {
    let start = null;
    let stop = null;
    const notWhitespaceRegex = /[^\s]/;
    while (this.currentIndex < this.value.length) {
      const currentChar = this.value[this.currentIndex];
      if (currentChar === "'" && this.value[this.currentIndex - 1] !== '\\') {
        this.insideQuote = !this.insideQuote;
      }
      if ((notWhitespaceRegex.test(currentChar) && !this.specialCharacters.includes(currentChar)) || this.insideQuote) {
        if (start === null) {
          start = this.currentIndex;
        }
        if (this.currentIndex === this.value.length - 1) {
          stop = this.currentIndex;
        }
      } else if (start !== null) {
        stop = this.currentIndex - 1;
        if (this.specialCharacters.includes(currentChar)) {
          // The next block will iterate past the current ';' or '.'
          // Need to back up so that on the next call to nextToken, the special character will be identified again
          this.currentIndex--;
        }
      }
      if (start !== null && stop !== null) {
        this.currentIndex++;
        return new CommonToken(Token.DEFAULT_CHANNEL, this.value.substring(start, stop + 1), {}, null, start, stop);
      }
      if (this.specialCharacters.includes(currentChar) && !this.insideQuote) {
        this.currentIndex++;
        return new CommonToken(Token.DEFAULT_CHANNEL, currentChar, {}, null, this.currentIndex - 1, this.currentIndex - 1);
      }
      this.currentIndex++;
    }
    return new CommonToken(Token.EOF);
  }

  line: number;
  charPositionInLine: number;
  inputStream: CharStream;
  sourceName: string;
  tokenFactory: TokenFactory;
  
}