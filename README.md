# SQLsurveyor

Zero-configuration SQL parsing. Get high-level descriptions of SQL statements for MySQL, PostgreSQL/Oracle and SQL Server (T-SQL) dialects.

## Execution

Generate all the lexers and parsers by running `npm run antl4ts-all`.

After generating the PL/SQL lexer/parser, you need to add the superclass imports:
```
import { PlSqlParserBase } from "./PlSqlParserBase";
```

and 

```
import { PlSqlLexerBase } from "./PlSqlLexerBase";
```

And prepend all method calls with `this.`. These grammars are designed for non-TypeScript languages, which do not require method calls to use the `this` keyword.


## Grammars

The grammars have been pulled from the following sources:

MySQL Grammar: https://github.com/mysql/mysql-workbench/tree/8.0/library/parsers/grammars
TSQL and PlSQL: https://github.com/antlr/grammars-v4/tree/master/sql

## 