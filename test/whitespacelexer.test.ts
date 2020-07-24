import { WhitespaceLexer } from '../dist/index';
import { Token } from 'antlr4ts';

test('WhitespaceLexer correctly parses SQL queries', () => {
  let sqlString = 'SELECT * FROM table';
  let lexer = new WhitespaceLexer(sqlString);
  expect(lexer.nextToken().text).toBe('SELECT');
  expect(lexer.nextToken().text).toBe('*');
  expect(lexer.nextToken().text).toBe('FROM');
  expect(lexer.nextToken().text).toBe('table');
  expect(lexer.nextToken().type !== Token.EOF);

  sqlString = '  SELECT \t* \r\n FROM  table   ';
  lexer = new WhitespaceLexer(sqlString);
  expect(lexer.nextToken().text).toBe('SELECT');
  expect(lexer.nextToken().text).toBe('*');
  expect(lexer.nextToken().text).toBe('FROM');
  expect(lexer.nextToken().text).toBe('table');
  expect(lexer.nextToken().type !== Token.EOF);

  sqlString = "SELECT * FROM table WHERE column = 'test'";
  lexer = new WhitespaceLexer(sqlString);
  expect(lexer.nextToken().text).toBe('SELECT');
  expect(lexer.nextToken().text).toBe('*');
  expect(lexer.nextToken().text).toBe('FROM');
  expect(lexer.nextToken().text).toBe('table');
  expect(lexer.nextToken().text).toBe('WHERE');
  expect(lexer.nextToken().text).toBe('column');
  expect(lexer.nextToken().text).toBe('=');
  expect(lexer.nextToken().text).toBe("'test'");
  expect(lexer.nextToken().type !== Token.EOF);

  sqlString = "SELECT * FROM table WHERE column = 'test and a missing quote";
  lexer = new WhitespaceLexer(sqlString);
  expect(lexer.nextToken().text).toBe('SELECT');
  expect(lexer.nextToken().text).toBe('*');
  expect(lexer.nextToken().text).toBe('FROM');
  expect(lexer.nextToken().text).toBe('table');
  expect(lexer.nextToken().text).toBe('WHERE');
  expect(lexer.nextToken().text).toBe('column');
  expect(lexer.nextToken().text).toBe('=');
  expect(lexer.nextToken().text).toBe("'test and a missing quote");
  expect(lexer.nextToken().type !== Token.EOF);

  sqlString = "SELECT * FROM table WHERE column = 'test and a \r\n newline'   ";
  lexer = new WhitespaceLexer(sqlString);
  expect(lexer.nextToken().text).toBe('SELECT');
  expect(lexer.nextToken().text).toBe('*');
  expect(lexer.nextToken().text).toBe('FROM');
  expect(lexer.nextToken().text).toBe('table');
  expect(lexer.nextToken().text).toBe('WHERE');
  expect(lexer.nextToken().text).toBe('column');
  expect(lexer.nextToken().text).toBe('=');
  expect(lexer.nextToken().text).toBe("'test and a \r\n newline'");
  expect(lexer.nextToken().type !== Token.EOF);
}); 