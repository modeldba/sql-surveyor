import { Token } from "./Token";
import { ParsingErrorType } from "./ParsingErrorType";

export class ParsingError {
  token: Token;
  type: ParsingErrorType;

  constructor(token: Token, type: ParsingErrorType) {
    this.token = token;
    this.type = type;
  }
}