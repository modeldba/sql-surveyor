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
  const sql = 'SELECT * FROM [tableName] t1 \r\n JOIN tableName2 [t2] ON [t1].id = t2.id';
  const parsedSql: ParsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  const parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.referencedTables).length).toBe(2);
  expect(parsedQuery.queryLocation.lineStart).toBe(1);
  expect(parsedQuery.queryLocation.lineEnd).toBe(2);
  expect(parsedQuery.queryLocation.startIndex).toBe(0);
  expect(parsedQuery.queryLocation.stopIndex).toBe(70); // 0-based indices, \r and \n are one character each
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


test('that output column names and aliases are correctly parsed', () => {
  let sql = 'SELECT col1 as c1, avg(col2) as average, t1.col3 as c3, col4 c4, (select count(*) from test), (select count(*) from test) as numRows, (select max(col1) from t1) maxval, '
  sql += ' [space column], [space column 2] as space2, [space column 3] space3, \'a string value\', \'another string value\' another, \'final string value\' as final FROM tableName t1;';
  
  const parsedSql: ParsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  const parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(13);

  const column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('col1');
  expect(column.columnAlias).toBe('c1');
  expect(column.tableName).toBeNull();
  expect(column.tableAlias).toBeNull();

  const column2 = parsedQuery.outputColumns[1];
  expect(column2.columnName).toBe('avg(col2)');
  expect(column2.columnAlias).toBe('average');
  expect(column2.tableName).toBeNull();
  expect(column2.tableAlias).toBeNull();

  const column3 = parsedQuery.outputColumns[2];
  expect(column3.columnName).toBe('t1.col3');
  expect(column3.columnAlias).toBe('c3');
  expect(column3.tableName).toBe('tableName');
  expect(column3.tableAlias).toBe('t1');

  const column4 = parsedQuery.outputColumns[3];
  expect(column4.columnName).toBe('col4');
  expect(column4.columnAlias).toBe('c4');
  expect(column4.tableName).toBeNull();
  expect(column4.tableAlias).toBeNull();

  const column5 = parsedQuery.outputColumns[4];
  expect(column5.columnName).toBe('(select count(*) from test)');
  expect(column5.columnAlias).toBeNull();
  expect(column5.tableName).toBeNull();
  expect(column5.tableAlias).toBeNull();

  const column6 = parsedQuery.outputColumns[5];
  expect(column6.columnName).toBe('(select count(*) from test)');
  expect(column6.columnAlias).toBe('numRows');
  expect(column6.tableName).toBeNull();
  expect(column6.tableAlias).toBeNull();

  const column7 = parsedQuery.outputColumns[6];
  expect(column7.columnName).toBe('(select max(col1) from t1)');
  expect(column7.columnAlias).toBe('maxval');
  expect(column7.tableName).toBeNull();
  expect(column7.tableAlias).toBeNull();

  const column8 = parsedQuery.outputColumns[7];
  expect(column8.columnName).toBe('space column');
  expect(column8.columnAlias).toBeNull();
  expect(column8.tableName).toBeNull();
  expect(column8.tableAlias).toBeNull();

  const column9 = parsedQuery.outputColumns[8];
  expect(column9.columnName).toBe('space column 2');
  expect(column9.columnAlias).toBe('space2');
  expect(column9.tableName).toBeNull();
  expect(column9.tableAlias).toBeNull();

  const column10 = parsedQuery.outputColumns[9];
  expect(column10.columnName).toBe('space column 3');
  expect(column10.columnAlias).toBe('space3');
  expect(column10.tableName).toBeNull();
  expect(column10.tableAlias).toBeNull();

  const column11 = parsedQuery.outputColumns[10];
  expect(column11.columnName).toBe("'a string value'");
  expect(column11.columnAlias).toBeNull();
  expect(column11.tableName).toBeNull();
  expect(column11.tableAlias).toBeNull();

  const column12 = parsedQuery.outputColumns[11];
  expect(column12.columnName).toBe("'another string value'");
  expect(column12.columnAlias).toBe('another');
  expect(column12.tableName).toBeNull();
  expect(column12.tableAlias).toBeNull();

  const column13 = parsedQuery.outputColumns[12];
  expect(column13.columnName).toBe("'final string value'");
  expect(column13.columnAlias).toBe('final');
  expect(column13.tableName).toBeNull();
  expect(column13.tableAlias).toBeNull();
});

test('that output column names and aliases are correctly parsed when subquery has a period', () => {
  let sql = 'select e2.employee_num, (select max(e.employee_num) from employees e) as counter, schemaName.employees.employee_id as eid from employees e2;';
  
  const parsedSql: ParsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  const parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(3);

  const column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('e2.employee_num');
  expect(column.columnAlias).toBeNull();
  expect(column.tableName).toBe('employees');
  expect(column.tableAlias).toBe('e2');

  const column2 = parsedQuery.outputColumns[1];
  expect(column2.columnName).toBe('(select max(e.employee_num) from employees e)');
  expect(column2.columnAlias).toBe('counter');
  expect(column2.tableName).toBeNull();
  expect(column2.tableAlias).toBeNull();

  const column3 = parsedQuery.outputColumns[2];
  expect(column3.columnName).toBe('schemaName.employees.employee_id');
  expect(column3.columnAlias).toBe('eid');
  expect(column3.tableName).toBe('schemaName.employees');
  expect(column3.tableAlias).toBeNull();
});

test('that output column names and aliases are correctly parsed for a CASE statement', () => {
  let sql = 'SELECT CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END FROM table1;';
  
  let parsedSql: ParsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  let parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(1);

  let column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END');
  expect(column.columnAlias).toBeNull();
  expect(column.tableName).toBeNull();
  expect(column.tableAlias).toBeNull();

  sql = 'SELECT CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END csstmt FROM table1;';
  parsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(1);

  column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END');
  expect(column.columnAlias).toBe('csstmt');
  expect(column.tableName).toBeNull();
  expect(column.tableAlias).toBeNull();

  sql = 'SELECT (CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END) FROM table1;';
  parsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(1);

  column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('(CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END)');
  expect(column.columnAlias).toBeNull();
  expect(column.tableName).toBeNull();
  expect(column.tableAlias).toBeNull();

  sql = 'SELECT (CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END) csstmt FROM table1;';
  parsedSql = surveyor.survey(sql);
  expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
  parsedQuery = parsedSql.getQueryAtLocation(0);
  expect(Object.keys(parsedQuery.outputColumns).length).toBe(1);

  column = parsedQuery.outputColumns[0];
  expect(column.columnName).toBe('(CASE WHEN a > 1 THEN 100 WHEN a < 1 THEN -100 ELSE 0 END)');
  expect(column.columnAlias).toBe('csstmt');
  expect(column.tableName).toBeNull();
  expect(column.tableAlias).toBeNull();
});