export default class UserEntity {

    public u_id: number;
    public u_firstname: string;
    public u_lastname: string;
    public u_username: string;
    public u_password: string;
    public u_email: string;
    public u_avatar: string;

    constructor(entity?: any) {
        if (entity) {
            this.u_id = entity.u_id || -1;
            this.u_firstname = entity.u_firstname || "";
            this.u_lastname = entity.u_lastname || "";
            this.u_username = entity.u_username || "";
            this.u_password = entity.u_password || "";
            this.u_email = entity.u_email || "";
            this.u_avatar = entity.u_avatar || "";
        }
    }
}