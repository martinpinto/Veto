'use strict';
/***************
 * Configuration
 ***************/
const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    config = require('./config/config'),
    morgan = require('morgan'),
    winston = require('winston');

let app = express(); // create the express app
app.set('startTime', new Date());

// fetch current API version from configuration
let currentAPIVersion = config.api.version;

app.use(compression()); // compress all requests

app.use(bodyParser.json()); // parse application/json
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev')); // log every request to the console
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
app.set('logger', logger);

// activate database and its routes
var api = require('./routes/api');

// set the API routes in express
app.use(config.api.root, api);

app.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.status(200).json({ "started": app.get('startTime') });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// proper development error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        stacktrace: err.stack
    });
});

// activate CORS for server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// error handlers
app.set('env', config.app.environment);

console.log('Web server listening at: %s', config.api.host + ':' + config.api.port);
// to start app in debug mode use: DEBUG=es_template:* ./bin/www OR nodemon --debug ./bin/www
module.exports = app;
