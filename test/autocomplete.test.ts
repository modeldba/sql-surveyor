import { SQLSurveyor, SQLDialect, ParsedSql, TokenLocation, AutocompleteOption, AutocompleteOptionType } from '../dist/index';
import { assert } from 'console';

let mysqlSurveyor: SQLSurveyor = null;
let plsqlSurveyor: SQLSurveyor = null;
let plpgsqlSurveyor: SQLSurveyor = null;
let tsqlSurveyor: SQLSurveyor = null;
beforeAll(() => {
  mysqlSurveyor = new SQLSurveyor(SQLDialect.MYSQL);
  plsqlSurveyor = new SQLSurveyor(SQLDialect.PLSQL);
  plpgsqlSurveyor = new SQLSurveyor(SQLDialect.PLpgSQL);
  tsqlSurveyor = new SQLSurveyor(SQLDialect.TSQL);
});

function containsOptionType(options: AutocompleteOption[], type: AutocompleteOptionType) {
  for (const option of options) {
    if (option.optionType === type) {
      return true;
    }
  }
  return false;
}

function allKeywordsBeginWith(options: AutocompleteOption[], value: string) {
  value = value.toUpperCase();
  for (const option of options) {
    if (option.optionType === AutocompleteOptionType.KEYWORD && !option.value.startsWith(value)) {
      return false;
    }
  }
  return true;
}

test('autocomplete detects table location', () => {
  const sql = 'SELECT * FROM t';
  const tsqlOptions = tsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(tsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(tsqlOptions, AutocompleteOptionType.COLUMN)).toBeFalsy();
  expect(allKeywordsBeginWith(tsqlOptions, 't')).toBeTruthy();
  const mysqlOptions = mysqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(mysqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(mysqlOptions, AutocompleteOptionType.COLUMN)).toBeFalsy();
  expect(allKeywordsBeginWith(mysqlOptions, 't')).toBeTruthy();
  const plsqlOptions = plsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(plsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(plsqlOptions, AutocompleteOptionType.COLUMN)).toBeFalsy();
  expect(allKeywordsBeginWith(plsqlOptions, 't')).toBeTruthy();
  const plpgsqlOptions = plpgsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(plpgsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(plpgsqlOptions, AutocompleteOptionType.COLUMN)).toBeFalsy();
  expect(allKeywordsBeginWith(plpgsqlOptions, 't')).toBeTruthy();
});

test('autocomplete detects column location', () => {
  const sql = 'SELECT * FROM table1 WHERE c';
  const tsqlOptions = tsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(tsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(tsqlOptions, AutocompleteOptionType.COLUMN)).toBeTruthy();
  expect(allKeywordsBeginWith(tsqlOptions, 'c')).toBeTruthy();
  const mysqlOptions = mysqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(mysqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(mysqlOptions, AutocompleteOptionType.COLUMN)).toBeTruthy();
  expect(allKeywordsBeginWith(mysqlOptions, 'c')).toBeTruthy();
  const plsqlOptions = plsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(plsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(plsqlOptions, AutocompleteOptionType.COLUMN)).toBeTruthy();
  expect(allKeywordsBeginWith(plsqlOptions, 'c')).toBeTruthy();
  const plpgsqlOptions = plpgsqlSurveyor.autocomplete(sql, sql.length);
  expect(containsOptionType(plpgsqlOptions, AutocompleteOptionType.TABLE)).toBeTruthy();
  expect(containsOptionType(plpgsqlOptions, AutocompleteOptionType.COLUMN)).toBeTruthy();
  expect(allKeywordsBeginWith(plpgsqlOptions, 'c')).toBeTruthy();

});