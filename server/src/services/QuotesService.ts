import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'
import WhereFilter from '../databases/engine/filter/WhereFilter';
import { Operator } from '../databases/engine/filter/Operator';

import { Quote } from '../models/Quote';

class QuotesService {
    private mongodb: MongoDbRepository;
    private mysql: MySqlRepository;

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.mysql = new MySqlRepository();
    }

    getQuotes() {
        return this.mysql.find(new WhereFilter(Operator.$NONE), new Quote(null)._name).then(rowset => {
            let quotes = [];
            for (let i = 0; i < rowset.length; i++) {
                quotes.push(new Quote(rowset[i]));
            }
            return quotes;
        });
    }

    createQuote(title, author, description, source, category, topic, type, hashtags, party) {
        // insert metadata into mysql

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

    archiveQuote(quoteId) {
        // mark quote as archived
    }

    addQuoteToFavorites(quoteId, userId) {
        // fetch user

        // add quoteId to user favorites array
    }
}

export default new QuotesService();