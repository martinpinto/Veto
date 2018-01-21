import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'

import Topic from '../models/Topic';
import { OperatorEnum, Operator } from '../databases/engine/filter/Operator';
import MySqlWhereFilter from '../databases/mysql/MySqlWhereFilter';
import { logger } from './LoggerService';
import Quote from '../models/Quote';

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
        return this.mysql.query(`SELECT topics.id AS \`Topic.id\`, topics.title AS \`Topic.title\`, topics.dateCreated AS \`Topic.dateCreated\` from QuotesTopics ${join} ${filter} GROUP BY topics.id`).then(rowset => {
            let topics: Topic[] = [];
            for (let row of rowset) {
                topics.push(new Topic(row));
                logger.debug(row);
            }

            for (let quote of quotes) {
                let topic = topics.find(t => { return t.quoteId == quote.id });
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