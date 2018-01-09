import Model from './Model';
import User from './User';

export default class Comment implements Model {
    public id: number;
    public _type: string;

    public title: string;
    public content: string;
    public dateCreated: string;
    public user: User;
    public userId: number;

    constructor(comment?: Comment) {
        this._type = "Comments";

        if (comment) {
            this.title = comment.title;
            this.content = comment.content;
            this.dateCreated = comment.dateCreated;
            this.userId = comment.userId;
        }
    }
}