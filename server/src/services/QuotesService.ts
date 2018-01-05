import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';
import { Operator } from '../databases/engine/filter/Operator';

import Quote from '../models/Quote';
import TopicsService from '../services/TopicsService';

var Promise = require('bluebird');

class QuotesService {
    private mongodb: MongoDbRepository;
    private mysql: MySqlRepository;

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.mysql = new MySqlRepository();
    }

    getQuotes(filter?: string): Promise<Quote[]> {
        //return this.mysql.find(new Quote()._name, null, " LEFT JOIN Topics as Topics on Quotes.topicId = Topics.id").then(rowset => {
        let topicIds: number[] = [];
        return this.mysql.find(new Quote()._type, filter ? filter : null).then(rowset => {
            let quotes: Quote[] = [];
            for (let i = 0; i < rowset.length; i++) {
                let quote = new Quote(rowset[i]);
                topicIds.push(quote.topicId);
                quotes.push(quote);
            }
            return quotes;
        }).then((quotes: Quote[]) => {
            return TopicsService.getTopicsById(topicIds).then(topics => {
                for (let i = 0; i < quotes.length; i++) {
                    let quote = quotes[i];
                    let topic = topics.find(t => {
                        return t.id == quote.topicId;
                    });
                    quote.topic = topic;
                    
                }
                console.log(quotes);
                return quotes;
            });
        });
    }

    getQuote(id: number) {
        return this.mysql.findById(new Quote()._type, id).then(rowdata => {
            let quote: Quote = new Quote(rowdata[0])
            console.log(quote);
            return quote;
        });
    }

    getTrendingQuotes() {
        let filter: string = "Quotes.dateCreated = CURDATE()";
        return this.getQuotes(filter);
    }

    getWeeklyQuotes() {
        let filter: string = "Quotes.dateCreated >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY " +
            "AND Quotes.dateCreated < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY";
        return this.getQuotes(filter);
    }

    addQuote(quote: Quote): Promise<string> {
        // insert metadata into mysql
        return this.mysql.create(quote, quote._type);
        
        // create new entry for comments into mongodb
    }

    addCommentToQuote(quoteId) {
        // add comments for quoteId into mongodb
    }

    addVoteToQuote(quoteId, voteType) {
        // query mysql to fetch votes for quoteId

        // increase or decrease votes

        // return current votes for quoteId (?)
    }

    addQuoteToFavorites(quoteId, userId) {
        // fetch user

        // add quoteId to user favorites array
    }
}

export default new QuotesService();