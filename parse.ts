import {InputStream, CommonTokenStream, tree} from 'antlr4';
import {TSqlQueryListener} from './src/parsing/TSQLQueryListener';
import {TSqlParser} from './output/tsql/TSqlParser.js';
import {TSqlLexer} from './output/tsql/TSqlLexer.js';
import {CaseChangingStream} from './src/parsing/CaseChangingStream'
import { TokenLocation } from './src/models/TokenLocation';
import { SQLSurveyor, SQLDialect } from './dist/index';

// const input = 'SELECT * FROM tableName t1 \r\n JOIN tableName2 t2 ON t1.id = t2.id';
// const input = 'SELECT t1.val FROM tableName as t1 where t1.col1 = 1 and (select 1 from tableName2) > 0';
const input = 'SELECT * from [database].[dbo].[tableName] t1 \r\n JOIN tableName2 \r\n ON t1.val = otherVal;';

// const chars = new InputStream(input);
// const caseChangingCharStream = new CaseChangingStream(chars, true);;
// const lexer = new TSqlLexer(caseChangingCharStream);

// // lexer.strictMode = false; // do not use js strictMode

// const tokens = new CommonTokenStream(lexer);
// const parser = new TSqlParser(tokens);
// // parser.buildParseTrees = true;
// const parsedTree = parser.tsql_file();

// const listener = new TSQLQueryListener(input);
// tree.ParseTreeWalker.DEFAULT.walk(listener, parsedTree);
// // console.log(TSqlParser.TABLE);
// // const tables = tokens.getTokens(0, input.length, [TSqlParser.]);
// // for (const token of tables) {
// //   const tokenLocation = new TokenLocation(token.line, token.start, token.stop);
// //   console.log(tokenLocation.getToken(input));
// // }


// // console.log(tokens.getTokens(0, input.length));
// console.log(parsedTree.toStringTree(parser.ruleNames));
// // console.log(listener.tableNameLocations);
// // for (const tableName of Object.keys(listener.tableNameLocations)) {
// //   for (const tokenLocation of listener.tableNameLocations[tableName]) {
// //     console.log(tokenLocation.getToken(input));
// //   }
// // }
// console.dir(listener.parsedSql, { depth: null });

const surveyor = new SQLSurveyor(SQLDialect.TSQL);
const parsedSql = surveyor.survey(input);
console.dir(parsedSql, { depth: null });