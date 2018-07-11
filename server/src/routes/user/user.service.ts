import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'
import User from './user.model';
import UserEntity from '../../shared/repositories/entities/user.entity';

class UsersService {
    private mysql: MySqlRepository;

    constructor() {
        this.mysql = new MySqlRepository();
    }

    async getUser(id: number) {
        // check if current logged in user id = user id
        let query: string = `SELECT * FROM User WHERE u_id = ${id}`;
        let rowdata = await this.mysql.query(query, null);
        let user: User = new User(new UserEntity(rowdata[0]));
        await this.mysql.close();
        return user;
    }

    async login(username: string, password: string) {
        let query: string = `SELECT * FROM User WHERE u_username = ${username} AND u_password = ${password}`;
        let rowdata = await this.mysql.query(query, null);
        let user: User = new User(new UserEntity(rowdata[0]));
        await this.mysql.close();
        return user;
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

}

export default new UsersService();