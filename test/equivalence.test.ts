import { SQLSurveyor, SQLDialect, ParsedSql, TokenLocation } from '../dist/index';

let mysqlSurveyor: SQLSurveyor = null;
let plsqlSurveyor: SQLSurveyor = null;
let plpgsqlSurveyor: SQLSurveyor = null;
let tsqlSurveyor: SQLSurveyor = null;
beforeAll(() => {
  mysqlSurveyor = new SQLSurveyor(SQLDialect.MYSQL);
  plsqlSurveyor = new SQLSurveyor(SQLDialect.PLSQL);
  plpgsqlSurveyor = new SQLSurveyor(SQLDialect.PLpgSQL);
  tsqlSurveyor = new SQLSurveyor(SQLDialect.TSQL);
});

test('equivalence for a select query with a JOIN', () => {
  const sql = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a select query with a subquery', () => {
  const sql = 'SELECT t1.val FROM tableName t1 where t1.col1 = 1 and (select 1 from tableName2) > 0';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a select query with a multiple output columns and a subquery', () => {
  const sql = 'SELECT t.column1, t.* FROM table1 t WHERE t.col in (select col from table2 where col3 = col4)';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a query with a common table expression', () => {
  const sql = 'with my_depts as (select dept_num from departments where department_name = \'test\') select * from my_depts  ;';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a query with multiple common table expressions', () => {
  const sql = 'with my_depts as (select dept_num from departments where department_name = \'test\'), my_emps as (select emp_num from employees) select * from my_depts;';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a query with multiple common table expressions and a subquery', () => {
  const sql = 'with my_depts as (select dept_num from departments where department_name = \'test\'), my_emps as (select emp_num from employees) select * from my_depts where dept_num in (select * from departmentemployees);';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for a query with a subquery', () => {
  const sql = 'SELECT t1.val FROM tableName t1 where t1.col1 = 1 and (select 1 from tableName2) > 0';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});

test('equivalence for an update query', () => {
  const sql = 'UPDATE departments SET department_name = \'lol\' WHERE dept_num = 1';
  const parsedMySql: ParsedSql = mysqlSurveyor.survey(sql);
  const parsedPlSql: ParsedSql = plsqlSurveyor.survey(sql);
  const parsedPLpgSql: ParsedSql = plpgsqlSurveyor.survey(sql);
  const parsedTSql: ParsedSql = tsqlSurveyor.survey(sql);
  expect(parsedMySql).toStrictEqual(parsedPlSql);
  expect(parsedMySql).toStrictEqual(parsedTSql);
  expect(parsedMySql).toStrictEqual(parsedPLpgSql);
});
