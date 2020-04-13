export class ReferencedTable {
    constructor(tableName) {
        this.tableName = tableName;
        this.aliases = new Set();
        this.locations = new Set();
    }
}
