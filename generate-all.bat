java -Xmx500M -classpath "libs/*" org.antlr.v4.Tool -Dlanguage=JavaScript -o output/plsql -visitor -package parsers grammars/plsql/PlSqlLexer.g4 grammars/plsql/PlSqlParser.g4
java -Xmx500M -classpath "libs/*" org.antlr.v4.Tool -Dlanguage=JavaScript -o output/tsql -visitor -package parsers grammars/tsql/TSqlLexer.g4 grammars/tsql/TSqlParser.g4
cd grammars\mysql
java -Xmx500M -classpath "../../libs/*" org.antlr.v4.Tool -Dlanguage=JavaScript -o ../../output/mysql -visitor -package parsers MySQLLexer.g4 MySQLParser.g4
cd ..\..