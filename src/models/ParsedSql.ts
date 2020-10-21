import { ParsedQuery } from "./ParsedQuery";
import { TokenLocation } from "./TokenLocation";

export class ParsedSql {

  parsedQueries: { [queryStartIndex: number]: ParsedQuery };

  constructor() {
    this.parsedQueries = {};
  }

  getQueryAtLocation(stringIndex: number): ParsedQuery {
    const queryIndex: number = this.getQueryIndexAtLocation(stringIndex);
    if (queryIndex !== null) {
      return Object.values(this.parsedQueries)[queryIndex];
    }
    return null;
  }

  getQueryIndexAtLocation(stringIndex: number): number {
    if (stringIndex === undefined || stringIndex === null) {
      return null;
    }
    const queryStartIndices: string[] = Object.keys(this.parsedQueries);
    for (let i = 0; i < queryStartIndices.length; i++) {
      const currentQueryStartIndex: number = Number(queryStartIndices[i]);
      let nextQueryStartIndex: number = null;
      if (queryStartIndices[i + 1] !== undefined) {
        nextQueryStartIndex = Number(queryStartIndices[i + 1]);
      }
      if (stringIndex >= currentQueryStartIndex 
        && (nextQueryStartIndex === null || stringIndex < nextQueryStartIndex)) {
        return i;
      }
    }
    return null;
  }

  getQueryLocations(): TokenLocation[] {
    const locations: TokenLocation[] = [];
    for (const parsedQuery of Object.values(this.parsedQueries)) {
      locations.push(parsedQuery.queryLocation);
    }
    return locations;
  }

  _addQuery(parsedQuery: ParsedQuery): void {
    this.parsedQueries[parsedQuery.queryLocation.startIndex] = parsedQuery;
  }

}