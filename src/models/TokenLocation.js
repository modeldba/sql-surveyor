export class TokenLocation {
    constructor(lineStart, lineEnd, startIndex, stopIndex) {
        this.lineStart = lineStart;
        this.lineEnd = lineEnd;
        this.startIndex = startIndex;
        this.stopIndex = stopIndex;
    }
    getToken(input) {
        return input.substring(this.startIndex, this.stopIndex + 1);
    }
}
