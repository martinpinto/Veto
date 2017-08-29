'use strict';
/***************
 * Configuration
 ***************/
import * as express from "express";
import * as conf from "./config/config";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as morgan from "morgan";
import * as winston from "winston";

import ApiRouter from "./routes/api";

class App {
    public express: express.Application;
    private config: any;

    constructor() {
        this.express = express();
        this.config = conf.default;
        this.middleware();
        this.routes();
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
        const tsFormat = () => (new Date()).toLocaleTimeString();
        const logger = new (winston.Logger)({
          transports: [
            // colorize the output to the console
            new (winston.transports.Console)({
              timestamp: tsFormat,
              colorize: true,
            })
          ]
        });
        this.express.set('logger', logger);
        
        // catch 404 and forward to error handler
        this.express.use(function(req, res, next) {
            var err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        
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
        this.express.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers',
                       'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        
        // error handlers
        this.express.set('env', this.config.app.environment);
        
        console.log('Web server listening at: %s', this.config.api.host + ':' + this.config.api.port);
        // to start app in debug mode use: DEBUG=es_template:* ./bin/www OR nodemon --debug ./bin/www
    }

    private routes(): void {
        // activate database and its routes
        // set the API routes in express
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
            message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1', ApiRouter);

        //this.app.use(router);
        
        //this.app.use(this.config.api.root, api);

        //this.app.get('/', function (req, res) {
        //    res.header('Access-Control-Allow-Origin', 'localhost');
        //    res.status(200).json({ "started": this.app.get('startTime') });
        //s});
    }
}    

export default new App().express;