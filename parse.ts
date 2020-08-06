import {InputStream, CommonTokenStream, tree} from 'antlr4';
import {TSqlQueryListener} from './src/parsing/TSQLQueryListener';
import {TSqlParser} from './output/tsql/TSqlParser.js';
import {TSqlLexer} from './output/tsql/TSqlLexer.js';
import {CaseChangingStream} from './src/parsing/CaseChangingStream'
import { TokenLocation } from './src/models/TokenLocation';
import { SQLSurveyor, SQLDialect } from './dist/index';
import { MySQLAutocomplete } from 'ts-mysql-autocomplete'


// const input = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
// const input = 'SELECT t1.val FROM tableName as t1 where t1.col1 = 1 and (select 1 from tableName2) > 0';
// const input = 'SELECT * from [database].[dbo].[tableName] t1 \r\n JOIN tableName2 \r\n ON t1.val = otherVal;';  
const input = 'SELECT t.column1, t.* FROM table1 t WHERE t.col in (select col from table2 where col3 = col4)';
const surveyor = new SQLSurveyor(SQLDialect.TSQL);
const parsedSql = surveyor.survey(input);
console.dir(parsedSql, { depth: null });
// const autocompleteOptions = surveyor.autocomplete(input, 11);
// console.dir(autocompleteOptions, { depth: null });
