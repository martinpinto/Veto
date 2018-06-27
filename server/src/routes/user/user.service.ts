import MongoDbRepository from '../../shared/repositories/mongodb/MongoDbRepository';
import { MySqlRepository } from '../../shared/repositories/mysql/MySqlRepository'
import { IWhereFilter } from '../../shared/repositories/engine/filter/WhereFilter';
import { Operator } from '../../shared/repositories/engine/filter/Operator';

import User from './user.model';

class UsersService {
  private mongodb: MongoDbRepository;
  private mysql: MySqlRepository;

  constructor() {
      this.mongodb = new MongoDbRepository();
      this.mysql = new MySqlRepository();
  }
   
  // getUsersById(ids: number[]): Promise<User[]> {
  //   let filter = [];
  //   for (let i = 0; i < ids.length - 1; i++) {
  //       filter.push(`ID = ${ids[i]} OR `);
  //   }
  //   filter.push(`ID = ${ids[ids.length - 1]}`);

  //   return this.mysql.find(new User()._type, filter.join("")).then(rowset => {
  //       let users: User[] = [];
  //       for (let i = 0; i < rowset.length; i++) {
  //           let user = new User(rowset[i]);
  //           users.push(user);
  //       }
  //       return users;
  //   });
  // }

  // private createSchema() {
  //     var mongoose = require('mongoose');
  //     var UserSchema = new mongoose.Schema({
  //       email: {
  //         type: String,
  //         unique: true,
  //         required: true,
  //         trim: true
  //       },
  //       username: {
  //         type: String,
  //         unique: true,
  //         required: true,
  //         trim: true
  //       },
  //       password: {
  //         type: String,
  //         required: true,
  //       },
  //       passwordConf: {
  //         type: String,
  //         required: true,
  //       }
  //     });
  //     //var User = mongoose.model('User', UserSchema);
  //     //module.exports = User;
  // }
}

export default new UsersService();