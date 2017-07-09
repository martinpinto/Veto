import MongoDbRepository from '../database/mongodb/MongoDbRepository';
import MySqlRepository from '../database/mysql/MySqlRepository'
import { Quote } from '../models/Quote';

export default class QuotesService {

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.db = new MySqlRepository();
    }

    getQuotes() {
        return this.db.find(new Quote(), {}).then(rowset => {
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