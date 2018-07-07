import Model from '../../shared/entities/model.entity';
import TopicEntity from '../../shared/entities/topic.entity';

export default class Topic extends Model {
    public id: number;
    
    public title: string;
    public dateCreated: string;

    topicId: number;
    quoteId: number;

    constructor(topic?: Topic | TopicEntity) {
        super();

        if (topic instanceof Topic) {
            this.id = topic.id || -1;
            this.title = topic.title || "";
            this.dateCreated = topic.dateCreated || "";
            this.topicId = topic.topicId || -1;
            this.quoteId = topic.quoteId || -1;
        } else if (topic instanceof TopicEntity) {
            this.id = topic.t_id || -1;
            this.title = topic.t_title || "";
            this.dateCreated = topic.t_dateCreated || "";
        }
    }

}