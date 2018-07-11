import Model from '../../shared/repositories/entities/model.entity';
import User from '../user/user.model';

export default class Comment extends Model {
    public id: number;

    public title: string;
    public content: string;
    public dateCreated: string;
    public user: User;
    public userId: number;

    constructor(comment?: Comment) {
        super();

        if (comment) {
            this.id = comment.id || -1;
            this.title = comment.title || "";
            this.content = comment.content || "";
            this.dateCreated = comment.dateCreated || "";
            this.userId = comment.userId || -1;
        }
    }
}