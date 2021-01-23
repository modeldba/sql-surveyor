import { SQLSurveyor, SQLDialect, ParsedSql, TokenLocation } from '../dist/index';

let surveyorDefault: SQLSurveyor = null;
let surveyorLogOnly: SQLSurveyor = null;
let surveyorThrowOnly: SQLSurveyor = null;
let surveyorThrowAndLog: SQLSurveyor = null;
let surveyorSilent: SQLSurveyor = null;
beforeAll(() => {
  surveyorDefault = new SQLSurveyor(SQLDialect.MYSQL);
  surveyorLogOnly = new SQLSurveyor(SQLDialect.MYSQL, {
    logErrors: true,
    throwErrors: false
  });
  surveyorThrowOnly = new SQLSurveyor(SQLDialect.MYSQL, {
    logErrors: false,
    throwErrors: true
  });
  surveyorThrowAndLog = new SQLSurveyor(SQLDialect.MYSQL, {
    logErrors: true,
    throwErrors: true
  });
  surveyorSilent = new SQLSurveyor(SQLDialect.MYSQL, {
    logErrors: false,
    throwErrors: false
  });
});

test('error handling options', () => {
  // Test based on known bug -- Can't handle subqueries in the FROM clause
  const sql = 'SELECT * FROM (SELECT a, b, c FROM tableName) sub; SELECT id FROM tableName2;';
  
  const originalConsoleError = console.error;
  try {
    console.error = () => {};
    for (const dialect in SQLDialect) {
      surveyorDefault.setDialect(SQLDialect[dialect]);
      const parsedSql: ParsedSql = surveyorDefault.survey(sql);
      expect(Object.keys(parsedSql.parsedQueries).length).toBe(1);
      
      surveyorLogOnly.setDialect(SQLDialect[dialect]);
      const parsedSql2: ParsedSql = surveyorLogOnly.survey(sql);
      expect(Object.keys(parsedSql2.parsedQueries).length).toBe(2);
    
      surveyorThrowOnly.setDialect(SQLDialect[dialect]);
      const parsedSql3: ParsedSql = surveyorThrowOnly.survey(sql);
      expect(Object.keys(parsedSql3.parsedQueries).length).toBe(1);
      
      surveyorThrowAndLog.setDialect(SQLDialect[dialect]);
      const parsedSql4: ParsedSql = surveyorThrowAndLog.survey(sql);
      expect(Object.keys(parsedSql4.parsedQueries).length).toBe(1);
    
      surveyorSilent.setDialect(SQLDialect[dialect]);
      const parsedSql5: ParsedSql = surveyorSilent.survey(sql);
      expect(Object.keys(parsedSql5.parsedQueries).length).toBe(2);
    }
  } finally {
    console.error = originalConsoleError;
  }
});