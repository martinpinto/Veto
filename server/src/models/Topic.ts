import Model from './Model';

export default class Topic extends Model {
    public id: number;
    
    public title: string;
    public dateCreated: string;

    constructor(topic?: Topic) {
        super();
        this._type = "Topics";

        if (topic) {
            this.id = topic.id;
            this.title = topic.title;
            this.dateCreated = topic.dateCreated;
        }
    }

}