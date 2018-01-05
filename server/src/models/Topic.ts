import Model from './Model';

export default class Topic implements Model {
    public id: number;
    public _type: string;
    
    public title: string;
    public dateCreated: string;

    constructor(topic?: Topic) {
        this._type = "Topics";

        if (topic) {
            this.id = topic.id;
            this.title = topic.title;
            this.dateCreated = topic.dateCreated;
        }
    }

}