import { SQLSurveyor, SQLDialect, ParsedSql, TokenLocation } from '../dist/index';

let surveyor: SQLSurveyor = null;
beforeAll(() => {
  surveyor = new SQLSurveyor(SQLDialect.TSQL);
});

test('that table names and aliases are correctly parsed', () => {
  const sql = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
  const parsedSql: ParsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  const parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.referencedTables).length).toBe(2);
  expect(parsedQuery.queryLocation.lineStart).toBe(1);
  expect(parsedQuery.queryLocation.lineEnd).toBe(2);
  expect(parsedQuery.queryLocation.startIndex).toBe(0);
  expect(parsedQuery.queryLocation.stopIndex).toBe(64); // 0-based indices, \r and \n are one character each
  expect(Object.keys(parsedQuery.tokens).length).toBe(16);

  const tableName = parsedQuery.referencedTables['tableName'];
  expect(tableName).toBeTruthy();
  expect(tableName.aliases.size).toBe(1);
  expect(tableName.aliases.has('t1')).toBeTruthy();
  expect(tableName.locations.size).toBe(2);
  expect(tableName.locations.has(new TokenLocation(1, 1, 14, 23)));
  expect(tableName.locations.has(new TokenLocation(1, 1, 54, 56)));
  expect(tableName.schemaName).toBeNull();
  expect(tableName.databaseName).toBeNull();

  const tableName2 = parsedQuery.referencedTables['tableName2'];
  expect(tableName2).toBeTruthy();
  expect(tableName2.aliases.size).toBe(1);
  expect(tableName2.aliases.has('t2')).toBeTruthy();
  expect(tableName2.locations.size).toBe(2);
  expect(tableName2.locations.has(new TokenLocation(1, 1, 37, 47)));
  expect(tableName2.locations.has(new TokenLocation(1, 1, 62, 64)));
  expect(tableName2.schemaName).toBeNull();
  expect(tableName2.databaseName).toBeNull();

  expect(parsedQuery.outputColumns.length).toBe(1);
  expect(parsedQuery.outputColumns[0].columnName).toBe('*');
  expect(parsedQuery.outputColumns[0].tableName).toBeNull();
  expect(parsedQuery.outputColumns[0].tableAlias).toBeNull();
});


test('that quote characters are removed from databases, schemas, tables, and columns', () => {
  const sql = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
  const parsedSql: ParsedSql = surveyor.survey(sql);

});

