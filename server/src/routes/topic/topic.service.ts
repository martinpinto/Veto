import MongoDbRepository from '../../shared/repositories/mongodb/MongoDbRepository';
import MySqlRepository from '../../shared/repositories/mysql/MySqlRepository'
import { OperatorEnum, Operator } from '../../shared/repositories/engine/filter/Operator';
import MySqlWhereFilter from '../../shared/repositories/mysql/MySqlWhereFilter';

import Topic from '../topic/topic.model';
import { logger } from '../../shared/services/LoggerService';
import Quote from '../quote/quote.model';

class TopicsService {
    private mongodb: MongoDbRepository;
    private mysql: MySqlRepository;

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.mysql = new MySqlRepository();
    }

    getTopicsById(ids: number[]): Promise<Topic[]> {
        let filter = [];
        for (let i = 0; i < ids.length - 1; i++) {
            filter.push(`ID = ${ids[i]} OR `);
        }
        filter.push(`ID = ${ids[ids.length - 1]}`);

        return this.mysql.find(new Topic()._type, filter.join("")).then(rowset => {
            let topics: Topic[] = [];
            for (let i = 0; i < rowset.length; i++) {
                let topic = new Topic(rowset[i]);
                topics.push(topic);
            }
            return topics;
        });
    }

    getTopicsForQuotes(quotes: Quote[]): Promise<Quote[]>{
        let quotesIds: string[] = [];
        for (let i = 0; i < quotes.length - 1; i++) {
            quotesIds.push(`QuotesTopics.quoteId = ${quotes[i].id} OR `);
        }
        quotesIds.push(`QuotesTopics.quoteId = ${quotes[quotes.length - 1].id}`);
        
        let filter = `WHERE ${quotesIds.join("")}`;
        let join = "JOIN Quotes on QuotesTopics.quoteId JOIN Topics on QuotesTopics.topicId";
        return this.mysql.query(`SELECT quoteId, topics.id AS \`id\`, topics.title AS \`title\`, topics.dateCreated AS \`dateCreated\` from QuotesTopics ${join} ${filter}`).then(rowset => {
            let topics: Topic[] = [];
            for (let row of rowset) {
                topics.push(new Topic(row));
                logger.debug(row);
            }
            logger.debug(JSON.stringify(topics, null, 2));
            for (let quote of quotes) {
                let topic = topics.find(t => { return t.quoteId == quote.id });
                logger.debug(topic);
                quote.topic = topic;
            }            
            return quotes;
        });
    }

    getTopicById(id: number): Promise<Topic> {
        return this.mysql.findById(new Topic()._type, id).then(rowset => {
            let topic: Topic = new Topic(rowset);
            return topic;
        });
    }

    getTopics(): Promise<Topic[]> {
        return this.mysql.find(new Topic()._type).then(rowset => {
            let topics: Topic[] = [];
            for (let i = 0; i < rowset.length; i++) {
                let topic = new Topic(rowset[i]);
                topics.push(topic);
            }
            return topics;
        });
    }
}

export default new TopicsService();