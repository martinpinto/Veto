import Model from './Model';

export default class User extends Model {
    public id: number;

    public firstname: string;
    public lastname: string;
    public username: string; // @ symbol
    public password: string;
    public email: string;
    public avatar: string;

    constructor(user?: User) {
        super();
        this._type = "Users";

        if (user) {
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.username = user.username;
            this.password = user.password;
            this.email = user.email;
            this.avatar = user.avatar;
        }
    }
}