import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'

import Topic from '../models/Topic';
import { OperatorEnum, Operator } from '../databases/engine/filter/Operator';
import MySqlWhereFilter from '../databases/mysql/MySqlWhereFilter';

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

    getTopicsQuotes() {
        //return this.mysql.find(new )
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