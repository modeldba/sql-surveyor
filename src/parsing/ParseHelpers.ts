import { TokenLocation } from "../models/TokenLocation";
import { ReferencedColumn } from "../models/ReferencedColumn";
import { ReferencedTable } from "../models/ReferencedTable";

export class ParseHelpers {

  static parseContextToReferencedTable(ctx: any, input: string, unquoteFn: Function) {
    let databaseName: string = null;
    if (ctx._database !== undefined) {
      const databaseLocation: TokenLocation = new TokenLocation(ctx._database._start._line, ctx._database._stop._line, ctx._database._start.start, ctx._database._stop.stop);
      databaseName = unquoteFn(databaseLocation.getToken(input));
    }
    let schemaName: string = null;
    if (ctx._schema !== undefined) {
      const schemaLocation: TokenLocation = new TokenLocation(ctx._schema._start._line, ctx._schema._stop._line, ctx._schema._start.start, ctx._schema._stop.stop);
      schemaName = unquoteFn(schemaLocation.getToken(input));
    }
    let tableNameOrAlias: string = null;
    let tableLocation: TokenLocation;
    if (ctx._table !== undefined) {
      tableLocation = new TokenLocation(ctx._table._start._line, ctx._table._stop._line, ctx._table._start.start, ctx._table._stop.stop);
      tableNameOrAlias = unquoteFn(tableLocation.getToken(input));
    } else {
      tableLocation = new TokenLocation(ctx._start._line, ctx._stop._line, ctx._start.start, ctx._stop.stop);
      tableNameOrAlias = unquoteFn(tableLocation.getToken(input));
    }
    const referencedTable = new ReferencedTable(tableNameOrAlias);
    referencedTable.schemaName = schemaName;
    referencedTable.databaseName = databaseName;
    return referencedTable;
  }
}