export default class TopicEntity {

    public t_id: number;
    public t_title: string;
    public t_dateCreated: string;
    public qt_quoteId: number;

    constructor(entity?) {
        if (entity) {
            this.t_id = entity.t_id;
            this.t_title = entity.t_title;
            this.t_dateCreated = entity.t_dateCreated;
            this.qt_quoteId = entity.qt_quoteId;
        }
    }
}