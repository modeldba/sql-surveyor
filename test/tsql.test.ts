import { SQLSurveyor, SQLDialect, ParsedSql } from '../dist/index';

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
  expect(Object.keys(parsedQuery.tokens).length).toBe(16);
});