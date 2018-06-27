import MongoDbRepository from '../../shared/repositories/mongodb/MongoDbRepository';
import MySqlRepository from '../../shared/repositories/mysql/MySqlRepository'
import { IWhereFilter } from '../../shared/repositories/engine/filter/WhereFilter';
import { Operator } from '../../shared/repositories/engine/filter/Operator';

import Quote from './quote.model';
import QuoteEntity from '../../shared/entities/QuoteEntity';
import TopicsService from '../topic/topic.service';
import PoliticiansService from '../politician/politician.service';
import { logger } from '../../shared/services/LoggerService';

class QuotesService {
    private mongodb: MongoDbRepository;
    private mysql: MySqlRepository;

    constructor() {
        this.mongodb = new MongoDbRepository();
        this.mysql = new MySqlRepository();
    }

    async getQuotes(filter?): Promise<Quote[]> {
        let query: string = `SELECT * FROM Quote RIGHT JOIN Party ON Quote.q_partyId = Party.py_id
        RIGHT JOIN User ON Quote.q_userId = User.u_id
        RIGHT JOIN Politician ON Quote.q_politicianId = Politician.p_id
        `;
        let rowset = await this.mysql.query(query);
        let quotes: Quote[] = [];
        for (let i = 0; i < rowset.length; i++) {
            console.log(rowset[i]);
            let quote = new Quote(new QuoteEntity(rowset[i]));
            quotes.push(quote);
        }
        return quotes;
        /*.then(quotes => {
            return TopicsService.getTopicsForQuotes(quotes);
        });*/
    }

    /* getQuotes(filter?): Promise<Quote[]> {
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
        return this.mysql.find(new Quote()._type + " AS Quotes", fields, null, join).then(rowset => {
            let quotes: Quote[] = [];
            for (let i = 0; i < rowset.length; i++) {
                let quote = new Quote(rowset[i]);
                quotes.push(quote);
            }
            return quotes;
        }).then(quotes => {
            return TopicsService.getTopicsForQuotes(quotes);
        });
    } */

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
        return this.mysql.query(`
            INSERT INTO Quotes 
                (description, dateCreated, politicianId) 
            VALUES 
                ('${quote.description}', '${new Date()}', ${quote.politicianId})`);
        
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