export class TokenLocation {
  startIndex: number;
  stopIndex: number;
  lineStart: number;
  lineEnd: number;

  constructor(lineStart: number, lineEnd: number, startIndex: number, stopIndex: number) {
    this.lineStart = lineStart;
    this.lineEnd = lineEnd;
    this.startIndex = startIndex;
    this.stopIndex = stopIndex;
  }

  getToken(input: string): string {
    return input.substring(this.startIndex, this.stopIndex + 1);
  }

}