import Model from './Model';

export default class Topic extends Model {
    public id: number;
    
    public title: string;
    public dateCreated: string;

    topicId: number;
    quoteId: number;

    constructor(topic?: Topic) {
        super();
        this._type = "Topic";

        if (topic) {
            this.id = topic.id || -1;
            this.title = topic.title || "";
            this.dateCreated = topic.dateCreated || "";
            this.topicId = topic.topicId || -1;
            this.quoteId = topic.quoteId || -1;
        }
    }

}