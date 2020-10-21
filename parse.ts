import { SQLSurveyor, SQLDialect } from './dist/index';

const input = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
// const input = 'SELECT t1.val FROM tableName as t1 where t1.col1 = 1 and (select 1 from tableName2) > 0';
// const input = 'SELECT * from [database].[dbo].[tableName] t1 \r\n JOIN tableName2 \r\n ON t1.val = otherVal;';  
// const input = 'SELECT * from "dbo"."tableName" t1 \r\n JOIN tableName2 \r\n ON t1.val = otherVal;';  
// const input = 'SELECT t.column1, t.* FROM table1 t WHERE t.col in (select col from table2 where col3 = col4)';
// const input = 'with my_depts as (select dept_num from departments where department_name = \'test\') select * from my_depts;';
// const input = 'with my_depts as (select dept_num from departments where department_name = \'test\'), my_emps as (select emp_num from employees) select * from my_depts;';
// const input = 'with my_depts as (select dept_num from departments where department_name = \'test\'), my_emps as (select emp_num from employees) select * from my_depts where dept_num in (select * from departmentemployees);';
// const input = 'UPDATE departments SET department_name = \'lol\' WHERE dept_num = 1';
// const input = 'SELECT * FROM tab WHERE col1 =';
// const input = 'SELECT * FROM; SELECT * FROM tab2';
// const input = 'SELECT t1.columnA as ca, t2.columnB FROM table1 t1 JOIN table2 t2 ON t1.id = t2.table1_id';
const surveyor = new SQLSurveyor(SQLDialect.MYSQL);
const parsedSql = surveyor.survey(input);
console.dir(parsedSql.parsedQueries, { depth: null });
