# sql-surveyor

SQL Surveyor is a zero configuration, high-level SQL parser. Existing parsers are low-level, giving you parse trees instead of
easy access to query details. So we built a high-level parser that handles all the parse tree analysis and
provides you with an easy to consume object representing your query. Identify tables, columns, aliases 
and more in your SQL script in one easy to consume object. See the [full API](https://modeldba.com/sql-surveyor/api) for details.

Parse one query or entire SQL scripts at once.
Supports MySQL, T-SQL (SQL Server), PL/pgSQL (PostgreSQL) and PL/SQL (Oracle) dialects.

## Install
```shell
npm install sql-surveyor
```

## [Full documentation can be found here](https://modeldba.com/sql-surveyor/docs/)

## Get Started

```typescript
import { SQLSurveyor, SQLDialect } from 'sql-surveyor';

const sql = 'SELECT t1.columnA, t2.columnB FROM table1 t1 JOIN table2 t2 ON t1.id = t2.table1_id';
const surveyor = new SQLSurveyor(SQLDialect.PLSQL);
const parsedSql = surveyor.survey(sql);
console.dir(parsedSql, { depth: null });

// ParsedSql {
//  parsedQueries: {
//   '0': ParsedQuery {
//    outputColumns: [
//     OutputColumn { columnName: 'columnA', columnAlias: null, tableName: 'table1', tableAlias: 't1'},
//     OutputColumn { columnName: 'columnB', columnAlias: null, tableName: 'table2', tableAlias: 't2'}
//    ],
//    referencedColumns: [
//      ReferencedColumn { 
//       columnName: 'id', tableName: 'table1', tableAlias: 't1', 
//       locations: Set { 
//        TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 63, stopIndex: 67 } 
//       }
//      },
//      ReferencedColumn { 
//       columnName: 'table1_id', tableName: 'table2', tableAlias: 't2', 
//       locations: Set {
//        TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 71, stopIndex: 82 } 
//       }
//      }
//    ],
//    referencedTables: {
//      table1: ReferencedTable { 
//        tableName: 'table1', schemaName: null, databaseName: null, aliases: Set { 't1' }, 
//        locations: Set { 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 35, stopIndex: 40 }, 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 63, stopIndex: 64 }, 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 7, stopIndex: 8 } }
//        },
//      table2: ReferencedTable { 
//        tableName: 'table2', schemaName: null, databaseName: null, aliases: Set { 't2' }, 
//        locations: Set { 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 50, stopIndex: 55 }, 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 71, stopIndex: 72 }, 
//         TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 19, stopIndex: 20 } 
//        }
//      }
//   },
//   tokens: {
//    '0': Token { value: 'SELECT', type: 'KEYWORD', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 0, stopIndex: 5 }},
//    '7': Token { value: 't1', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 7, stopIndex: 8 }},
//    '9': Token { value: '.', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 9, stopIndex: 9 }},
//    '10': Token { value: 'columnA', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 10, stopIndex: 16 }},
//    '17': Token { value: ',', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 17, stopIndex: 17 }},
//    '19': Token { value: 't2', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 19, stopIndex: 20 }},
//    '21': Token { value: '.', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 21, stopIndex: 21 }},
//    '22': Token { value: 'columnB', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 22, stopIndex: 28 }},
//    '30': Token { value: 'FROM', type: 'KEYWORD', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 30, stopIndex: 33 }},
//    '35': Token { value: 'table1', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 35, stopIndex: 40 }},
//    '42': Token { value: 't1', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 42, stopIndex: 43 }},
//    '45': Token { value: 'JOIN', type: 'KEYWORD', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 45, stopIndex: 48 }},
//    '50': Token { value: 'table2', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 50, stopIndex: 55 }},
//    '57': Token { value: 't2', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 57, stopIndex: 58 }},
//    '60': Token { value: 'ON', type: 'KEYWORD', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 60, stopIndex: 61 }},
//    '63': Token { value: 't1', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 63, stopIndex: 64 }},
//    '65': Token { value: '.', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 65, stopIndex: 65 }},
//    '66': Token { value: 'id', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 66, stopIndex: 67 }},
//    '69': Token { value: '=', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 69, stopIndex: 69 }},
//    '71': Token { value: 't2', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 71, stopIndex: 72 }},
//    '73': Token { value: '.', type: 'OPERATOR', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 73, stopIndex: 73 }},
//    '74': Token { value: 'table1_id', type: 'IDENTIFIER', location: TokenLocation { lineStart: 1, lineEnd: 1, startIndex: 74, stopIndex: 82 }}
//    },
//    query: 'SELECT t1.columnA, t2.columnB FROM table1 t1 JOIN table2 t2 ON t1.id = t2.table1_id',
//    queryType: 'DML',
//    queryLocation: TokenLocation { lineStart: 1,lineEnd: 1,startIndex: 0,stopIndex: 82 },
//    queryErrors: [],
//    subqueries: {},
//    commonTableExpressions: {}
//   }
//  }
// }
```

## Created By

[![modelDBA logo](https://modeldba.com/sql-surveyor/modelDBA128x128.png "modelDBA")](https://modeldba.com)

sql-surveyor is a project created and maintained by [modelDBA](https://modeldba.com), a database IDE for modern developers. 
modelDBA lets you visualize SQL as you type and edit tables easily with a no-code table editor.

