import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';
import { Operator } from '../databases/engine/filter/Operator';

import Politician from '../models/Politician';

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