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
        res.header('Access-Control-Allow-Origin', '*');
        let quotes = await QuotesService.getQuotes();
        logger.debug(JSON.stringify(quotes, null, 2));
        res.status(200).json(quotes);
        return quotes;
    },
    async getOneAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote> {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.params && req.params.id) {
            let id: number = req.params.id;

            let quote = await QuotesService.getQuote(id);
            res.status(200).json(quote);
            return quote;
        }
        return null;
    },
    async createAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<any> {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.body) {
            // or like this -> let quote: Quote = <Quote>req.body;
            let quote: Quote = <Quote>req.body;
            // let quote: Quote = new Quote(req.body); doesn't work
            let result = await QuotesService.addQuote(quote);

            //this.mongodb.create(quote);

            res.status(200).json(result);
            return null;
        }
        return null;
    },
    async updateAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote> {
        // const list = await listModel.update(req.body, req.user.id);
        // res.json(list);
        // return list;
        return null;
    },
    async deleteAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<boolean> {
        // const id = parseInt(req.params.id, 10);
        // const result = await listModel.delete(id, req.user.id);
        // res.json(true);
        // return true;
        return null;
    },
    async weeklyQuotesAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote> {
        res.header('Access-Control-Allow-Origin', '*');
        // QuotesService.getWeeklyQuotes().then(quotes => {
        //   logger.debug(quotes);
        //   res.status(200).json(quotes);
        // });
        return null;
    },
    async trendingQuotesAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Quote> {
        res.header('Access-Control-Allow-Origin', '*');

        // QuotesService.getTrendingQuotes().then(quotes => {
        //   logger.debug(quotes);
        //   res.status(200).json(quotes);
        // });
        return null;
    }
};
