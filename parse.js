const antlr4 = require('antlr4');
const {CaseChangingStream} = require("./CaseChangingStream");
const TSqlParser = require('./output/tsql/TSqlParser.js');
const TSqlLexer = require('./output/tsql/TSqlLexer.js');

const input = 'SELECT * FROM table';

const chars = new antlr4.InputStream(input);
const caseChangingCharStream = new CaseChangingStream(chars, true);;
const lexer = new TSqlLexer.TSqlLexer(caseChangingCharStream);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new TSqlParser.TSqlParser(tokens);
const tree = parser.tsql_file();

console.log(tree.toStringTree(parser.ruleNames));