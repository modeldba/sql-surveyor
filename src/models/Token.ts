import { TokenLocation } from "./TokenLocation";
import { TokenType } from "./TokenType";

export class Token {
  value: string;
  type: TokenType;
  location: TokenLocation;

  constructor(value: string, type: TokenType, location: TokenLocation) {
    this.value = value;
    this.type = type;
    this.location = location;
  }

  setValue(input: string): void {
    this.value = this.location.getToken(input);
  }
}