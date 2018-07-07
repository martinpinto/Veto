import MongoDbRepository from '../../shared/repositories/mongodb/mongodb.repository';
import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'

import Quote from './quote.model';
import QuoteEntity from '../../shared/entities/quote.entity';
import TopicsService from '../topic/topic.service';
import { logger } from '../../shared/services/logger.service';

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
        logger.debug(query);
        let rows: any[] = await this.mysql.query(query, null);
        logger.debug(rows);
        let quotes: Quote[] = [];
        for (let i = 0; i < rows.length; i++) {
            let quote = new Quote(new QuoteEntity(rows[i]));
            quotes.push(quote);
        }
        await this.mysql.close();
        return quotes;
        /*.then(quotes => {
            return TopicsService.getTopicsForQuotes(quotes);
        });*/
    }

    async getQuote(id: number) {
        let query = `SELECT * FROM Quote RIGHT JOIN Party ON Quote.q_partyId = Party.py_id 
        RIGHT JOIN User ON Quote.q_userId = User.u_id 
        RIGHT JOIN Politician ON Quote.q_politicianId = Politician.p_id WHERE Quote.q_id = ${id}`;
        let rowdata = await this.mysql.query(query, null);
        let quote: Quote = new Quote(new QuoteEntity(rowdata[0]));
        return quote;
    }

    async addQuote(quote: Quote) {
        let result = await this.mysql.query(`
            INSERT INTO Quote 
                (q_title, q_description, q_dateCreated, q_politicianId) 
            VALUES 
                ('${quote.title}', '${quote.description}', '${this.mysql.convertDateToYMD(new Date())}', ${quote.politicianId})`, null);
        return result;
        // create new entry for comments into mongodb
    }

    // getTrendingQuotes() {
    //     let filter: string = "Quotes.dateCreated = CURDATE()";
    //     return this.getQuotes(filter);
    // }

    // getWeeklyQuotes() {
    //     let filter: string = "Quotes.dateCreated >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY " +
    //         "AND Quotes.dateCreated < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY";
    //     return this.getQuotes(filter);
    // }

    // addCommentToQuote(quoteId) {
    //     // add comments for quoteId into mongodb
    // }

    // addVoteToQuote(quoteId, voteType) {
    //     // query mysql to fetch votes for quoteId

    //     // increase or decrease votes

    //     // return current votes for quoteId (?)
    // }

    // addQuoteToFavorites(quoteId, userId) {
    //     // fetch user

    //     // add quoteId to user favorites array
    // }
}

export default new QuotesService();