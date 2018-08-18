import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'
import User from './user.model';
import UserEntity from '../../shared/repositories/entities/user.entity';
import { logger } from '../../shared/services/logger.service';

const bcrypt = require('bcrypt');

class UsersService {
    private mysql: MySqlRepository;
    private SALT = 10;

    constructor() {
        this.mysql = new MySqlRepository();
    }

    async getUser(id: number) {
        // check if current logged in user id = user id
        const query: string = `SELECT * FROM User WHERE u_id = ${id}`;
        let rowdata = await this.mysql.query(query, null);
        let user: User = new User(new UserEntity(rowdata[0]));
        return user;
    }

    async login(username: string, password: string) {
        const salt = await bcrypt.genSalt(this.SALT);        
        const hashPassword = await bcrypt.hash(password, salt);
        
        const query: string = `SELECT * FROM User WHERE u_username = ?`;
        const values: string[] = [username];
        logger.debug(query);        
        let rowdata = await this.mysql.query(query, values);
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
        const password = user.password;
        const salt = await bcrypt.genSalt(this.SALT);
        const hashPassword = await bcrypt.hash(password, salt);

        // Store the user to the database, then send the response
        const query: string = `INSERT INTO User (
            u_firstname, u_lastname, u_username, u_password, u_email
        ) VALUES (
            ?, ?, ?, ?, ?
        )`;
        const values: string[] = [user.firstname, user.lastname, user.username, hashPassword, user.email];
        logger.debug(query);
        try {
            let rowdata: any = await this.mysql.query(query, values);
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