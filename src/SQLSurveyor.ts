import { SQLDialect } from "./models/SQLDialect";
import { ParsedSql } from "./models/ParsedSql";
import {CaseChangingStream} from './parsing/CaseChangingStream';
import {TSqlQueryListener} from "./parsing/TSQLQueryListener";
import {TSqlParser} from '../output/tsql/TSqlParser';
import {TSqlLexer} from '../output/tsql/TSqlLexer';
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";

export class SQLSurveyor {

  _dialect: SQLDialect;

  constructor(dialect: SQLDialect) {
    this._dialect = dialect;
    if (this._dialect === null || this._dialect === undefined) {
      this._dialect = SQLDialect.TSQL;
    }
  }

  survey(sqlScript: string): ParsedSql {
    const chars = new ANTLRInputStream(sqlScript);
    const caseChangingCharStream = new CaseChangingStream(chars, true);
    const lexer = new TSqlLexer(caseChangingCharStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new TSqlParser(tokens);
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    const parsedTree = parser.tsql_file();
    const listener = new TSqlQueryListener(sqlScript);
    // @ts-ignore Weak Type Detection
    ParseTreeWalker.DEFAULT.walk(listener, parsedTree);
    return listener.parsedSql;
  }

}