export class ParsedSql {
    constructor() {
        this.parsedQueries = {};
    }
    getQueryAtLocation(stringIndex) {
        const queryStartIndices = Object.keys(this.parsedQueries);
        for (let i = 0; i < queryStartIndices.length; i++) {
            const currentQueryStartIndex = Number(queryStartIndices[i]);
            let nextQueryStartIndex = null;
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
    _addQuery(parsedQuery) {
        this.parsedQueries[parsedQuery.queryLocation.startIndex] = parsedQuery;
    }
}
