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

    getQuotes(filter?): Promise<Quote[]> {
        let fields: string = `Quotes.id AS \`quotes.id\`,
            Quotes.title AS \`quotes.title\`,
            Quotes.description AS \`quotes.description\`,
            Quotes.status AS \`quotes.status\`,
            Quotes.votes AS \`quotes.votes\`,
            Quotes.dateCreated AS \`quotes.dateCreated\`,
            Quotes.dateQuote AS \`quotes.dateQuote\`,
            Quotes.source AS \`quotes.source\`,
            Quotes.partyId AS \`quotes.partyId\`,
            Quotes.userId AS \`quotes.userId\`,
            Quotes.politicianId AS \`quotes.politicianId\`,
            Parties.id AS \`parties.id\`, 
            Parties.name AS \`parties.name\`,
            Parties.logo AS \`parties.logo\`,
            Parties.link AS \`parties.link\`,
            Users.id AS \`Users.id\`,
            Users.firstname AS \`Users.firstname\`,
            Users.lastname AS \`Users.lastname\`,
            Users.username AS \`Users.username\`,
            Users.password AS \`Users.password\`,
            Users.email AS \`Users.email\`,
            Politicians.id AS \`Politicians.id\`,
            Politicians.firstname AS \`Politicians.firstname\`,
            Politicians.lastname AS \`Politicians.lastname\`,
            Politicians.role AS \`Politicians.role\`,
            Politicians.avatar AS \`Politicians.avatar\`,
            Politicians.votes AS \`Politicians.votes\`,
            Politicians.partyId AS \`Politicians.partyId\``;
        let join: string = ` RIGHT JOIN Parties as Parties ON Quotes.partyId = Parties.id
        RIGHT JOIN Users as Users ON Quotes.userId = Users.id
        RIGHT JOIN Politicians as Politicians ON Quotes.politicianId = Politicians.id        
        `;
        return this.mysql.find(new Quote()._type, null, join ? join : null).then(rowset => {
            let quotes: Quote[] = [];
            console.log(rowset);
            for (let i = 0; i < rowset.length; i++) {
                console.log('party.name:', rowset[i]['party.name']);
                let quote = new Quote(rowset[i]);
                quotes.push(quote);
            }
            return quotes;
        });
    }

    getQuote(id: number) {
        return this.mysql.findById(new Quote()._type, id).then(rowdata => {
            let quote: Quote = new Quote(rowdata[0])
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