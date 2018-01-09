'use strict';
/***************
 * Configuration
 ***************/
import * as express from "express";
import * as session from "express-session";
import * as cors from "cors";
import * as conf from "./config/config";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as morgan from "morgan";
import ApiRouter from "./routes/Api";
import { logger } from "./services/LoggerService";

class App {
    public express: express.Application;
    private config: any;

    constructor() {
        this.express = express();
        this.config = conf.default;
        this.middleware();
        this.routes();
        this.authentication();
    }

    private middleware(): void {
        this.express.set('startTime', new Date());
        
        // fetch current API version from configuration
        let currentAPIVersion = this.config.api.version;
        
        this.express.use(compression()); // compress all requests
        
        this.express.use(bodyParser.json()); // parse application/json
        // parse application/vnd.api+json as json
        this.express.use(bodyParser.json({
            type: 'application/vnd.api+json'
        }));
        
        this.express.set('views', path.join(__dirname, 'views'));
        this.express.set('view engine', 'ejs');
        
        // parse application/x-www-form-urlencoded
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        
        this.express.use(morgan('dev')); // log every request to the console
        
        this.express.set('logger', logger);
        
        // proper development error handling
        this.express.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                stacktrace: err.stack
            });
        });
        
        // activate CORS for server
        this.express.use(cors());
        
        // error handlers
        this.express.set('env', this.config.app.environment);
        
        logger.debug('Web server listening at: %s', this.config.api.host + ':' + this.config.api.port);
        // to start app in debug mode use: DEBUG=es_template:* ./bin/www OR nodemon --debug ./bin/www
    }

    private routes(): void {
        // activate database and its routes
        // set the API routes in express
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'localhost');
            res.json({ 
                "started": this.express.get('startTime') 
            });
        });
        this.express.use('/', router);
        this.express.use(this.config.api.root, ApiRouter);

        let swaggerUi = require('swagger-ui-express'),
        swaggerDocument = require('../swagger.json');
        
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.express.use('/api/v1', router);
    }

    private authentication(): void {        
        this.express.get('/twitter_callback', (req, res) => {
            this.express.get("logger").debug(res);
            res.end("Authorization Succeded");
        });
    }
}    

export default new App().express;