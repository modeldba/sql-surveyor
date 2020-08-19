import { MultiQueryMySQLParserListener } from '../../output/mysql/MultiQueryMySQLParserListener';
import { BaseSqlQueryListener } from './BaseSqlQueryListener';
import { TokenLocation } from '../models/TokenLocation';
import { ParsedQuery } from '../models/ParsedQuery';
import { QueryType } from '../models/QueryType';

export class MySQLQueryListener extends BaseSqlQueryListener implements MultiQueryMySQLParserListener {

  enterQuery(ctx) {
    const queryLocation: TokenLocation = this._getClauseLocation(ctx);
    this.parsedSql._addQuery(new ParsedQuery(QueryType.DML, queryLocation.getToken(this.input), queryLocation));
  }

}