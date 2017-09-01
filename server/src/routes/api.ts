/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import QuotesService from "../services/QuotesService";

import MongoDbRepository from '../databases/mongodb/MongoDbRepository';
import { Quote } from '../models/Quote';

import config from '../config/config';

import { Router, Request, Response, NextFunction } from 'express';

export class ApiRouter {
    router: Router;
    db: MongoDbRepository;
    //quotesService: QuotesService;

    // Config Parameters
    quotesRoute: string;
    usersRoute: string;

    constructor() {
        this.router = Router();

        this.db = new MongoDbRepository();
        //this.quotesService = new QuotesService();
        
        // Config Parameters
        this.quotesRoute = config.api.routes[0];
        this.usersRoute = config.api.routes[1];

        this.init();
    }
    
    /**
     *  Test route
     *  sends HTTP status 200 to show server is working OK.
     *  @return an HTTP status 200
     */
    public getTest(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({ "started": "Api is up and running..." });
    }
    
    ///////////////////////////////// QUOTES /////////////////////////////////
    
    /**
     * Get all quotes
     */
    public getAllQuotes(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        // or like this -> let quotes: Quote = <Quote>req.body;
		// let quotesService: QuotesService = new QuotesService().getQuotes().then(...);
        QuotesService.getQuotes().then(quotes => {
            console.log(quotes);
            res.status(200).json(quotes);
        });
    }
    
    /**
     * Add new quote
     */
    public postNewQuote(req: Request, res: Response, next: NextFunction) {
        if (typeof req.body !== "undefined") {
            res.header('Access-Control-Allow-Origin', '*');
            // or like this -> let quote: Quote = <Quote>req.body;
            // TODO: turn Quote into typescript interface            
            let quote = new Quote(req.body);
    
            this.db.create(quote);
    
            res.status(200).json({});
        }
    }
    
    /**
     * Vote for a quote
     */
    public postNewVote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({});
    }
    
    public patchQuote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({});
    }
    
    public deleteQuote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({});
    }

    init() {
        this.router.get("/", this.getTest);
        this.router.get(`/${this.quotesRoute}`, this.getAllQuotes);
        this.router.post(`/${this.quotesRoute}`, this.postNewQuote);            
        this.router.post(`/${this.quotesRoute}/voting`, this.postNewVote);            
        this.router.patch(`/${this.quotesRoute}`, this.patchQuote);
        this.router.delete(`/${this.quotesRoute}`, this.deleteQuote);
    }

}

///////////////////////////////// AUTHORS /////////////////////////////////

///////////////////////////////// TOPICS /////////////////////////////////

const apiRouter = new ApiRouter();
apiRouter.init();

export default apiRouter.router;