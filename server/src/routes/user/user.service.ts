import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'
import User from './user.model';
import UserEntity from '../../shared/repositories/entities/user.entity';

const bcrypt = require('bcrypt');

class UsersService {
    private mysql: MySqlRepository;
    private SALT = 10;

    constructor() {
        this.mysql = new MySqlRepository();
    }

    async getUser(id: number) {
        // check if current logged in user id = user id
        let query: string = `SELECT * FROM User WHERE u_id = ${id}`;
        let rowdata = await this.mysql.query(query, null);
        let user: User = new User(new UserEntity(rowdata[0]));
        return user;
    }

    async login(username: string, password: string) {
        let salt = await bcrypt.genSalt(this.SALT);        
        let hashPassword = await bcrypt.hash(password, salt);
        
        let query: string = `SELECT * FROM User WHERE u_username = '${username}'`;
        console.log(query);        
        let rowdata = await this.mysql.query(query, null);
        // const match = await bcrypt.compare(password, user.passwordHash);
        let user: User = new User(new UserEntity(rowdata[0]));
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
        }
        return null;
    }

    async register(user) {
        let password = user.password;
        let salt = await bcrypt.genSalt(this.SALT);
        let hashPassword = await bcrypt.hash(password, salt);

        // Store the user to the database, then send the response
        let query: string = `INSERT INTO User (
            u_firstname, u_lastname, u_username, u_password, u_email
        ) VALUES (
            '${user.firstname}', '${user.lastname}', '${user.username}', '${hashPassword}', '${user.email}'
        )`;
        console.log(query);
        try {
            let rowdata: any = await this.mysql.query(query, null);
            return rowdata.insertId;
        } catch (err) {
            throw err;
        }
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