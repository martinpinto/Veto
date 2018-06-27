export default class QuoteEntity {
    /* quote entity */
    public q_id: number;
    public q_title: string;
    public q_description: string;
    public q_status: string;
    public q_votes: number;
    public q_dateCreated: string; // should be date YYYY-MM-dd for mysql
    public q_dateQuote: string; // should be date YYYY-MM-dd for mysql
    public q_source: string;
    public q_partyId: number;
    public q_userId: number;
    public q_politicianId: number;
    /* party entity */
    public py_id: number;
    public py_name: string;
    public py_logo: string;
    public py_link: string;
    /* user entity */
    public u_id: number;
    public u_firstname: string;
    public u_lastname: string;
    public u_username: string;
    public u_password: string;
    public u_email: string;
    public u_avatar: string;
    /* politician entity */
    public p_id: number;
    public p_firstname: string;
    public p_lastname: string;
    public p_role: string;
    public p_avatar: string;
    public p_votes: number;
    public p_partyId: number;

    constructor(entity?: any) {
        if (entity) {
            this.q_id = entity.q_id  || -1;
            this.q_title = entity.q_title || "";
            this.q_description = entity.q_description || "";
            this.q_status = entity.q_status || "";
            this.q_votes = entity.q_votes || 0;
            this.q_dateCreated = entity.q_dateCreated || "";
            this.q_dateQuote = entity.q_dateQuote || "";
            this.q_source = entity.q_source || "";
            this.q_partyId = entity.q_partyId || -1;
            this.q_userId = entity.q_userId || -1;
            this.q_politicianId = entity.q_politicianId || -1;
            
            /* party entity */
            this.py_id = entity.py_id;
            this.py_name = entity.py_name;
            this.py_logo = entity.py_logo;
            this.py_link = entity.py_link;
            
            /* user entity */
            this.u_id = entity.u_id;
            this.u_firstname = entity.u_firstname;
            this.u_lastname = entity.u_lastname;
            this.u_username = entity.u_username
            this.u_password = entity.u_password;
            this.u_email = entity.u_email;
            this.u_avatar = entity.u_avatar;
            
            /* politician entity */
            this.p_id = entity.p_id;
            this.p_firstname = entity.p_firstname;
            this.p_lastname = entity.p_lastname;
            this.p_role = entity.p_role;
            this.p_avatar = entity.p_avatar;
            this.p_votes = entity.p_votes;
            this.p_partyId = entity.p_partyId;
        }
    }
}