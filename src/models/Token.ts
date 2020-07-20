import { TokenLocation } from "./TokenLocation";

export class Token {
  value: string;
  location: TokenLocation;

  constructor(value: string, location: TokenLocation) {
    this.value = value;
    this.location = location;
  }
}