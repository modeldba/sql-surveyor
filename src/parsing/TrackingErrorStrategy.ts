import { DefaultErrorStrategy, Parser, FailedPredicateException, NoViableAltException, RecognitionException, InputMismatchException } from "antlr4ts";
import { ParsingError } from "../models/ParsingError";
import { Token } from "../models/Token";
import { TokenLocation } from "../models/TokenLocation";
import { ParsingErrorType } from "../models/ParsingErrorType";

/**
 * An error strategy that keeps track of any parsing errors,
 * but does not otherwise change the DefaultErrorStrategy 
 */
export class TrackingErrorStrategy extends DefaultErrorStrategy {

  errors: ParsingError[] = [];

  protected reportFailedPredicate(recognizer: Parser, e: FailedPredicateException): void {
    const token = this._getToken(recognizer);
    this.errors.push(new ParsingError(token, ParsingErrorType.FAILED_PREDICATE));
    
    super.reportFailedPredicate(recognizer, e);
  }

  protected reportInputMismatch(recognizer: Parser, e: InputMismatchException): void {
    const token = this._getToken(recognizer);
    this.errors.push(new ParsingError(token, ParsingErrorType.MISMATCHED_INPUT));
    
    super.reportInputMismatch(recognizer, e);
  }
  
  protected reportMissingToken(recognizer: Parser): void {
    const token = this._getToken(recognizer);
    this.errors.push(new ParsingError(token, ParsingErrorType.MISSING_TOKEN));
    
    super.reportMissingToken(recognizer);
  }
  
  protected reportNoViableAlternative(recognizer: Parser, e: NoViableAltException): void {
    const token = this._getToken(recognizer);
    this.errors.push(new ParsingError(token, ParsingErrorType.NO_VIABLE_ALTERNATIVE));

    super.reportNoViableAlternative(recognizer, e);
  }
  
  protected reportUnwantedToken(recognizer: Parser): void {
    const token = this._getToken(recognizer);
    this.errors.push(new ParsingError(token, ParsingErrorType.UNWANTED_TOKEN));

    super.reportUnwantedToken(recognizer);
  }

  _getToken(recognizer: Parser): Token {
    const token = new Token(null, new TokenLocation(recognizer.currentToken.line, recognizer.currentToken.line, recognizer.currentToken.startIndex, recognizer.currentToken.stopIndex));
    if (token.location.startIndex > token.location.stopIndex) {
      // Error was at <EOF>, set token at end
      token.location.startIndex = token.location.stopIndex;
    }
    return token;
  }

}