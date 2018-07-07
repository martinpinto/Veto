import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'

import Topic from '../topic/topic.model';
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

    // getTopicsForQuotes(quotes: Quote[]): Promise<Quote[]>{
    //     let quotesIds: string[] = [];
    //     for (let i = 0; i < quotes.length - 1; i++) {
    //         quotesIds.push(`QuotesTopics.quoteId = ${quotes[i].id} OR `);
    //     }
    //     quotesIds.push(`QuotesTopics.quoteId = ${quotes[quotes.length - 1].id}`);
        
    //     let filter = `WHERE ${quotesIds.join("")}`;
    //     let join = "JOIN Quotes on QuotesTopics.quoteId JOIN Topics on QuotesTopics.topicId";
    //     return this.mysql.query(`SELECT quoteId, topics.id AS \`id\`, topics.title AS \`title\`, topics.dateCreated AS \`dateCreated\` from QuotesTopics ${join} ${filter}`).then(rowset => {
    //         let topics: Topic[] = [];
    //         for (let row of rowset) {
    //             topics.push(new Topic(row));
    //             logger.debug(row);
    //         }
    //         logger.debug(JSON.stringify(topics, null, 2));
    //         for (let quote of quotes) {
    //             let topic = topics.find(t => { return t.quoteId == quote.id });
    //             logger.debug(topic);
    //             quote.topic = topic;
    //         }            
    //         return quotes;
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