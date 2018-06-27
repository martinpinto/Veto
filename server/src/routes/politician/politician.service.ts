import MongoDbRepository from '../../shared/repositories/mongodb/MongoDbRepository';
import MySqlRepository from '../../shared/repositories/mysql/MySqlRepository'
import { IWhereFilter } from '../../shared/repositories/engine/filter/WhereFilter';
import { Operator } from '../../shared/repositories/engine/filter/Operator';

import Politician from './politician.model';

class PoliticiansService {
  private mongodb: MongoDbRepository;
  private mysql: MySqlRepository;

  constructor() {
      this.mongodb = new MongoDbRepository();
      this.mysql = new MySqlRepository();
  }
   
  getPoliticiansById(ids: number[]): Promise<Politician[]> {
    let filter = [];
    for (let i = 0; i < ids.length - 1; i++) {
        filter.push(`ID = ${ids[i]} OR `);
    }
    filter.push(`ID = ${ids[ids.length - 1]}`);

    return this.mysql.find(new Politician()._type, filter.join("")).then(rowset => {
        let politicians: Politician[] = [];
        for (let i = 0; i < rowset.length; i++) {
            let politician = new Politician(rowset[i]);
            politicians.push(politician);
        }
        return politicians;
    });
  }

}

export default new PoliticiansService();