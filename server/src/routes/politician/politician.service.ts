import MongoDbRepository from '../../shared/repositories/mongodb/mongodb.repository';
import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'

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

    let query: string = "SELECT * FROM Politician WHERE p_id = ${}"
    return this.mysql.query(query, null).then(rowset => {
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