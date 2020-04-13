import { ParsedQuery } from "./ParsedQuery";
import { TokenLocation } from "./TokenLocation";

export class ParsedSql {

  parsedQueries: { [queryStartIndex: number]: ParsedQuery };

  constructor() {
    this.parsedQueries = {};
  }

  getQueryAtLocation(stringIndex: number): ParsedQuery {
    const queryStartIndices: string[] = Object.keys(this.parsedQueries);
    for (let i = 0; i < queryStartIndices.length; i++) {
      const currentQueryStartIndex: number = Number(queryStartIndices[i]);
      let nextQueryStartIndex: number = null;
      if (queryStartIndices[i + 1] !== undefined) {
        nextQueryStartIndex = Number(queryStartIndices[i + 1]);
      }
      if (stringIndex > currentQueryStartIndex 
        && (nextQueryStartIndex === null || stringIndex < nextQueryStartIndex)) {
        return this.parsedQueries[queryStartIndices[i]];
      }
    }
    return null;
  }

  _addQuery(parsedQuery: ParsedQuery) {
    this.parsedQueries[parsedQuery.queryLocation.startIndex] = parsedQuery;
  }

}