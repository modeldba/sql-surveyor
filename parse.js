const antlr4 = require('antlr4');
const TSqlParser = require('./output/tsql/TSqlParser.js');
const TSqlLexer = require('./output/tsql/TSqlLexer.js');

const input = 'SELECT * FROM tableName';

const chars = new antlr4.InputStream(input);
const lexer = new TSqlLexer.TSqlLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new TSqlParser.TSqlParser(tokens);
const tree = parser.tsql_file();

console.log(tree.toStringTree(parser.ruleNames));