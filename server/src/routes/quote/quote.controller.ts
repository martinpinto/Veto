import * as express from 'express';
import { logger } from '../../shared/services/logger.service';

import Quote from './quote.model';
import QuotesService from './quote.service';

export const controller = {
    async getAllAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote[]> {
        let quotes = await QuotesService.getQuotes();
        if (quotes) {
            logger.debug(JSON.stringify(quotes, null, 2));
            res.status(200).json(quotes);
            return quotes;
        }  else {
            res.status(400);
        }
        return null;
    },
    async getOneAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote> {
        if (req.params && req.params.id) {
            let id: number = req.params.id;

            let quote = await QuotesService.getQuote(id);
            res.status(200).json(quote);
            return quote;
        } else {
            res.status(400);
        }
        return null;
    },
    async createAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<any> {
        if (req.body) {
            // or like this -> let quote: Quote = <Quote>req.body;
            let quote: Quote = <Quote>req.body;
            // let quote: Quote = new Quote(req.body); doesn't work
            let result = await QuotesService.addQuote(quote);

            //this.mongodb.create(quote);

            res.status(200).json(result);
            return null;
        } 
        res.status(400);
        return null;
    },
    async getWeeklyAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote[]> {
        let quotes = await QuotesService.getWeeklyQuotes();
        if (quotes) {
            logger.debug(JSON.stringify(quotes, null, 2));
            res.status(200).json(quotes);
            return quotes;
        }  else {
            res.status(400);
        }
        return null;
    },
    async upOrDownVoteQuoteAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<any> {
        // request type options:
        // {
        //     "vote": "Up" # Down, None
        // }
        if (req.body) {
            let result = await QuotesService.addVoteToQuote(req.params.id, req.body.vote);
            res.status(200).json(result);
            return result;
        }
        res.status(400);
        return null;
    },
    async createQuoteUserFavoriteAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<any> {
        if (req.body) {
            let result = await QuotesService.addQuoteToUserFavorites(req.params.id, req.user.id);
            res.status(200).json(result);
            return result;
        }
        res.status(400);
        return null;
    },
    async deleteAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<boolean> {
        // to be implemented for admins
        // const id = parseInt(req.params.id, 10);
        // const result = await listModel.delete(id, req.user.id);
        // res.json(true);
        // return true;
        return null;
    }
};
