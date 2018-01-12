import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import MySqlRepository from '../databases/mysql/MySqlRepository'
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';
import { Operator } from '../databases/engine/filter/Operator';

import Quote from '../models/Quote';
import TopicsService from './TopicsService';
import PoliticiansService from './PoliticiansService';

var Promise = require('bluebird');

class QuotesService {
    private mongodb: MongoDbRepository;
    private mysql: MySqlRepository;

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.mysql = new MySqlRepository();
    }

    getQuotes(filter?): Promise<Quote[]> {
        let fields: string = `Quotes.id AS \`id\`,
            Quotes.title AS \`title\`,
            Quotes.description AS \`description\`,
            Quotes.status AS \`status\`,
            Quotes.votes AS \`votes\`,
            Quotes.dateCreated AS \`dateCreated\`,
            Quotes.dateQuote AS \`dateQuote\`,
            Quotes.source AS \`source\`,
            Quotes.partyId AS \`partyId\`,
            Quotes.userId AS \`userId\`,
            Quotes.politicianId AS \`politicianId\`,
            Parties.id AS \`Party.id\`, 
            Parties.name AS \`Party.name\`,
            Parties.logo AS \`Party.logo\`,
            Parties.link AS \`Party.link\`,
            Users.id AS \`User.id\`,
            Users.firstname AS \`User.firstname\`,
            Users.lastname AS \`User.lastname\`,
            Users.username AS \`User.username\`,
            Users.password AS \`User.password\`,
            Users.email AS \`User.email\`,
            Politicians.id AS \`Politician.id\`,
            Politicians.firstname AS \`Politician.firstname\`,
            Politicians.lastname AS \`Politician.lastname\`,
            Politicians.role AS \`Politician.role\`,
            Politicians.avatar AS \`Politician.avatar\`,
            Politicians.votes AS \`Politician.votes\`,
            Politicians.partyId AS \`Politician.partyId\``;
        let join: string = ` RIGHT JOIN Parties as Parties ON Quotes.partyId = Parties.id
        RIGHT JOIN Users as Users ON Quotes.userId = Users.id
        RIGHT JOIN Politicians as Politicians ON Quotes.politicianId = Politicians.id        
        `;
        return this.mysql.find(new Quote()._type, fields, null, join).then(rowset => {
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