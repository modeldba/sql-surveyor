# SQLsurveyor

Zero-configuration SQL parsing. Get high-level descriptions of SQL statements for MySQL, PostgreSQL/Oracle and SQL Server (T-SQL) dialects.



## Grammars

The grammars have been pulled from the following sources:

MySQL Grammar: https://github.com/mysql/mysql-workbench/tree/8.0/library/parsers/grammars

TSQL and PlSQL: https://github.com/antlr/grammars-v4/tree/master/sql

We generate directly from the grammars supplied by those sources and make no modifications to them (this makes it easier to stay up to date). Some grammars use in-line code or base classes that must be added in after generating the parsers and lexers. Instructions for individual grammars are below.

### Generating Grammars

Generate all the lexers and parsers by running `npm run antl4ts-all`.

If you just need to re-generate one of the grammars, you can run one of the following:
```
npm run antlr4ts-mysql    # MySQL
npm run antlr4ts-plsql    # PL/SQL (Oracle/PostgreSQL)
npm run antlr4ts-tsql     # TSQL (Microsoft SQL Server)
```

### PL/SQL

After generating the PL/SQL lexer/parser, you need to add the superclass imports:
```
import { PlSqlParserBase } from "./PlSqlParserBase";
```
and 
```
import { PlSqlLexerBase } from "./PlSqlLexerBase";
```

And prepend all method calls with `this.`. These grammars are designed for non-TypeScript languages, which do not require method calls to use the `this` keyword.

### MySQL

After generating the MySQL lexer/parser, you need to add the superclass imports:
```
import { MySQLBaseLexer } from './MySQLBaseLexer';
import { SqlMode } from './common';
```
and
```
import { MySQLBaseParser } from "./MySQLBaseParser";
import { SqlMode } from './common';
```

And prepend all method calls with `this.` and all static references with `MySQLLexer.`. Additionally, you must append references to `SqlMode` variables (essentially, anything that is left over after prepending with the previous two items) with `SqlMode.`.

## Related

Much thanks to (ts-mysql-parser)[https://github.com/stevenmiller888/ts-mysql-parser], which forms the basis of our MySQL parsing.