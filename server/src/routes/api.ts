/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import QuotesService from "../services/QuotesService";
import Quote from '../models/Quote';
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';

import * as jwt from "express-jwt";

import config from '../config/config';{}
import { Router, Request, Response, NextFunction } from 'express';

export class ApiRouter {
    router: Router;

    // Config Parameters
    quotesRoute: string;
    usersRoute: string;

    constructor() {
        this.router = Router();
        
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
    
    public getUsers(req: Request, res: Response, next: NextFunction) {
        let users = [
            { id: 1, name: 'Todd Motto', image: 'image-1.jpg' },
            { id: 2, name: 'Brad Green', image: 'image-2.jpg' },
            { id: 3, name: 'Igor Minar', image: 'image-3.jpg' }
        ];

        res.json(users);
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

    public getFilteredQuotes(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');        
        if (req.query) {
            //let filter = new IWhereFilter({ $AND: [ { $EQ: { id: 2 } }, { $NEQ: { name: "Test" } } ]});
            //QuotesService.getFilteredQuotes(filter);
        }
    }
    
    /**
     * Add new quote
     */
    public postNewQuote(req: Request, res: Response, next: NextFunction) {
        if (typeof req.body !== "undefined") {
            res.header('Access-Control-Allow-Origin', '*');
            // or like this -> let quote: Quote = <Quote>req.body;
            let quote: Quote = new Quote(req.body);
            QuotesService.addQuote(quote);

            //this.mongodb.create(quote);
    
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
        // Authentication middleware provided by express-jwt.
        // This middleware will check incoming requests for a valid
        // JWT on any routes that it is applied to.
        let authCheck = jwt({
            secret: new Buffer(config.oauth.secret, 'base64'),
            audience: config.oauth.client
        });

        this.router.get("/", this.getTest);

        this.router.get("/users", authCheck, this.getUsers);

        this.router.get(`/${this.quotesRoute}`, this.getAllQuotes);
        this.router.get(`/${this.quotesRoute}/filter`, this.getFilteredQuotes);
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