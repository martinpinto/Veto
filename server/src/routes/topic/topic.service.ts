import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'

import Topic from '../topic/topic.model';
import Quote from '../quote/quote.model';
import TopicEntity  from '../../shared/entities/topic.entity';
import { logger } from '../../shared/services/logger.service';

class TopicsService {
    private mysql: MySqlRepository;

    constructor() {
        this.mysql = new MySqlRepository();
    }

    async getTopics(): Promise<Topic[]> {
        let query: string = `SELECT * FROM Topic`;
        let rowset = await this.mysql.query(query, null);
        let topics: Topic[] = [];
        for (let i = 0; i < rowset.length; i++) {
            let topic = new Topic(new TopicEntity(rowset[i]));
            topics.push(topic);
        }
        return topics;
    }

    async getTopicsForQuotes(quotes: Quote[]): Promise<Quote[]>{
        // (SELECT DISTINCT (Topic.t_id, Topic.t_title, Topic.t_dateCreated) FROM QuoteTopic 
        // INNER JOIN Quote ON QuoteTopic.qt_quoteId = Quote.q_id
        // INNER JOIN Topic ON QuoteTopic.qt_topicId = Topic.t_id) GROUP BY Quote.q_id
        let quoteIdSubquery: string[] = [];
        for (let i = 0; i < quotes.length - 1; i++) {
            quoteIdSubquery.push(`QuoteTopic.qt_quoteId = ${quotes[i].id} OR `);
        }
        quoteIdSubquery.push(`QuoteTopic.qt_quoteId = ${quotes[quotes.length - 1].id}`);
        
        let filter = `WHERE ${quoteIdSubquery.join("")}`;
        let join = "JOIN Quote on QuoteTopic.qt_quoteId JOIN Topic on QuoteTopic.qt_topicId";
        let query = `SELECT qt_quoteId, 
            Topic.t_id,
            Topic.t_title,
            Topic.t_dateCreated 
            FROM QuoteTopic ${join} ${filter}`;
        logger.debug(query);
        let rowset = await this.mysql.query(query, null)
        logger.debug("Rowset");logger.debug(JSON.stringify(rowset, null, 2));
        let allTopics: Topic[] = [];
        for (let row of rowset) {
            allTopics.push(new Topic(new TopicEntity(row)));
        }
        // logger.debug(JSON.stringify(allTopics, null, 2));
        for (let quote of quotes) {
            let topics: Topic[] = [...new Set(allTopics.filter(t => { return t.quoteId == quote.id }))];
            logger.debug(topics);
            quote.topics = topics;
        }            
        return quotes;
    }

    // getTopicsById(ids: number[]): Promise<Topic[]> {
    //     let filter = [];
    //     for (let i = 0; i < ids.length - 1; i++) {
    //         filter.push(`ID = ${ids[i]} OR `);
    //     }
    //     filter.push(`ID = ${ids[ids.length - 1]}`);

    //     return this.mysql.find(new Topic()._type, filter.join("")).then(rowset => {
    //         let topics: Topic[] = [];
    //         for (let i = 0; i < rowset.length; i++) {
    //             let topic = new Topic(rowset[i]);
    //             topics.push(topic);
    //         }
    //         return topics;
    //     });
    // }

    // getTopicById(id: number): Promise<Topic> {
    //     return this.mysql.findById(new Topic()._type, id).then(rowset => {
    //         let topic: Topic = new Topic(rowset);
    //         return topic;
    //     });
    // }
}

export default new TopicsService();