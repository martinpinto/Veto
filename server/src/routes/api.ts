/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import QuotesService from "../services/QuotesService";
import Quote from '../models/Quote';
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';

import * as jwt from 'express-jwt';
import * as winston from "winston";

import config from '../config/config';{}
import { Router, Request, Response, NextFunction } from 'express';
import TopicsService from "../services/TopicsService";

import { logger } from '../services/LoggerService';

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

        this.initRoutes();
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
        res.header('Access-Control-Allow-Origin', '*');
        
        let users = [
            { id: 1, name: 'Todd Motto', image: 'image-1.jpg' },
            { id: 2, name: 'Brad Green', image: 'image-2.jpg' },
            { id: 3, name: 'Igor Minar', image: 'image-3.jpg' }
        ];

        res.json(users);
    }

    ///////////////////////////////// QUOTES /////////////////////////////////
    
    /** Get all quotes */
    public getAllQuotes(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        // or like this -> let quotes: Quote = <Quote>req.body;
        QuotesService.getQuotes().then(quotes => {
            logger.debug(quotes);
            res.status(200).json(quotes);
        });
    }

    public getWeeklyQuotes(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        QuotesService.getWeeklyQuotes().then(quotes => {
            logger.debug(quotes);
            res.status(200).json(quotes);
        });
    }

    public getTrendingQuotes(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');

        QuotesService.getTrendingQuotes().then(quotes => {
            logger.debug(quotes);
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

    public getQuote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.params) {
            let id: number = req.params.id;
            if (id) {
                QuotesService.getQuote(id).then(quote => {
                    res.status(200).json(quote);
                });
            }
        }     
    }
    
    /** Add new quote */
    public postNewQuote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.body) {
            // or like this -> let quote: Quote = <Quote>req.body;
            let quote: Quote = new Quote(req.body);
            QuotesService.addQuote(quote);

            //this.mongodb.create(quote);
    
            res.status(200).json({});
        }
    }

    public postUpvoteQuote(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');                
        if (req.params) {
            let id: number = req.params.id;
            if (id) {

            }
        }
    }
    
    /** Vote for a quote */
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

    ///////////////////////////////// TOPICS /////////////////////////////////

    public getTopics(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        
        TopicsService.getTopics().then(topics => {
            res.status(200).json(topics);
        });
    }

    initRoutes() {
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
        this.router.get(`/${this.quotesRoute}/:id`, this.getQuote);
        this.router.get(`/${this.quotesRoute}/filter`, this.getFilteredQuotes);
        this.router.post(`/${this.quotesRoute}`, this.postNewQuote);            
        this.router.post(`/${this.quotesRoute}/voting`, this.postNewVote);            
        this.router.patch(`/${this.quotesRoute}`, this.patchQuote);
        this.router.delete(`/${this.quotesRoute}`, this.deleteQuote);

        this.router.get(`/topics`, this.getTopics);
    }

}

///////////////////////////////// AUTHORS /////////////////////////////////

///////////////////////////////// TOPICS /////////////////////////////////

const apiRouter = new ApiRouter();
apiRouter.initRoutes();

export default apiRouter.router;