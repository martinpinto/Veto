import MongoDbRepository from '../../shared/repositories/mongodb/mongodb.repository';
import { MySqlRepository } from '../../shared/repositories/mysql/mysql.repository'

import Quote from './quote.model';
import QuoteEntity from '../../shared/repositories/entities/quote.entity';
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
        if (filter) {
            filter = ` WHERE ${filter} `;
        } else {
            filter = "";
        }
        const query: string = `SELECT * FROM Quote ${filter}RIGHT JOIN Party ON Quote.q_partyId = Party.py_id
            RIGHT OUTER JOIN User ON Quote.q_userId = User.u_id
            RIGHT OUTER JOIN Politician ON Quote.q_politicianId = Politician.p_id`;
        logger.debug(query);
        let rows: any[] = await this.mysql.query(query, null);
        logger.debug(JSON.stringify(rows, null, 2));
        let quotes: Quote[] = [];
        for (let i = 0; i < rows.length; i++) {
            let quote = new Quote(new QuoteEntity(rows[i]));
            quotes.push(quote);
        }
        await TopicsService.getTopicsForQuotes(quotes);
        return quotes;
    }

    async getQuote(id: number) {
        const query = `SELECT * FROM Quote RIGHT JOIN Party ON Quote.q_partyId = Party.py_id 
            RIGHT JOIN User ON Quote.q_userId = User.u_id 
            RIGHT JOIN Politician ON Quote.q_politicianId = Politician.p_id WHERE Quote.q_id = ?`;
        let rowdata = await this.mysql.query(query, [id]);
        let quote: Quote = new Quote(new QuoteEntity(rowdata[0]));
        return quote;
    }

    async addQuote(quote: Quote) {
        const values = [
            quote.title, 
            quote.description, 
            this.mysql.convertDateToYMD(new Date()), 
            quote.politicianId
        ];
        let result = await this.mysql.query(`
            INSERT INTO Quote 
                (q_title, q_description, q_dateCreated, q_politicianId) 
            VALUES (
                ?, ?, ?, ?
            )`, values);
        return result;
        // create new entry for comments into mongodb
    }

    async addVoteToQuote(quoteId: number, voteType: string) {
        // query mysql to fetch votes for quoteId
        let upOrDownVote: string;
        if (voteType === "Up") {
            upOrDownVote = "+ 1";
        } else if (voteType === "Down") {
            upOrDownVote = "- 1";
        } else {
            throw Error("Invalid voteType");
        }
        // increase or decrease votes
        let result = await this.mysql.query(`UPDATE Quote 
            SET q_votes = q_votes ${upOrDownVote} WHERE q_id = ?`, [quoteId]);
        return result; // return current votes for quoteId (?)
    }

    async addQuoteToUserFavorites(quoteId, userId) {
        // add quoteId to user favorites
        let result = await this.mysql.query(`
            INSERT INTO UserFavoriteQuote
                (ufq_userId, ufq_quoteId)
            VALUES (
                ?, ?
            )`, [userId, quoteId]);
        return result;
    }

    async getWeeklyQuotes() {
        let filter: string = `Quote.q_dateCreated >= curdate() - INTERVAL DAYOFWEEK(curdate()) + 6 DAY 
            AND Quote.q_dateCreated < curdate() - INTERVAL DAYOFWEEK(curdate()) - 1 DAY`;
        return this.getQuotes(filter);
    }

    // addCommentToQuote(quoteId) {
    //     // add comments for quoteId into mongodb
    // }
}

export default new QuotesService();