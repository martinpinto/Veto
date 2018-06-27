#!/usr/bin/env node
import * as express from 'express';
import * as debug from "debug";
import { createServer } from 'http';
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as cors from "cors";

import { router as apiRouter } from "./routes";

const { Config } = require('./config/index');
const { logger } = require('./shared/services/LoggerService');
const { fs } = require('fs');

debug("ts-express:server");

const config = Config();
const app: express.Application = express();
const port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.api.port || '3000');
const ip = process.env.OPENSHIFT_NODEJS_IP || config.api.host || "127.0.0.1";
const options = {
  // key: fs.readFileSync('./localhost.key'),
  // cert: fs.readFileSync('./localhost.cert')    
}

app.set('port', port);
app.set('domain', ip);

// const server = createServer(options, app);
const server = createServer(app);

middleware();
routes();

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

bootstrap();

///////////////////////////////////////////////////////////////////////////////////

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): number|boolean {
  var port: number = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  let addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`);
}

function bootstrap(): void {
  let fs = require('fs');
  let bootstrapFolder = "./src/bootstrap";
  try {
    let files = fs.readdirSync(bootstrapFolder);
  
    if (files) {
      files.forEach(element => {
        fs.readFile(`${bootstrapFolder}/${element}`, 'utf8', (err, data) => {
          if (err) {
            return console.log(err);
          }
          let exec = require('child_process').exec, child;
      
          child = exec(`node ${bootstrapFolder}/${element} {{args}}`, (error, stdout, stderr) => {
              if (error !== null) {
                console.log('exec error: ' + error);
              }
          });
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function middleware(): void {
  app.set('startTime', new Date());
  
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
  
  app.set('logger', logger);
  
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
  app.use(cors());
  
  // error handlers
  app.set('env', config.app.environment);
  
  logger.debug('Web server listening at: %s', config.api.host + ':' + config.api.port);
}

function routes(): void {
  // activate database and its routes
  // set the API routes in express
  let router = express.Router();
  // placeholder route handler
  router.get('/', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'localhost');
      res.json({ 
          "started": app.get('startTime') 
      });
  });
  app.use('/', router);
  app.use('/api', apiRouter);

  let swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

function authentication(): void {
  const { passport } = require('passport');
  const { Strategy } = require('passport-local');
  const { expressJwt } = require('express-jwt');
  const { jwt } = require('jsonwebtoken');

  const PORT = 1337;
  const SECRET = 'server secret';
  const TOKENTIME = 120 * 60; // in seconds

  // https://medium.com/hyphe/token-based-authentication-in-node-6e8731bfd7f2
  // curl -X POST -H ‘Content-Type: application/json’ -d ‘{ “username”: “devils name”, “password”: “666” }’ localhost:3001/auth
  passport.use(new Strategy(  
    (username, password, done) => {
      // database dummy - find user and verify password
      // find user from db and compare the hash
      if(username === 'devils name' && password === '666'){
        done(null, {
          id: 666,
          firstname: 'devils',
          lastname: 'name',
          email: 'devil@he.ll',
          verified: true
        });
      }
      else {
        done(null, false);
      }
    }
  ));

  const db = {
    updateOrCreate: function(user, cb) {
      // db dummy, we just cb the user
      cb(null, user);
    }
  };

  function serialize(req, res, next) {
    db.updateOrCreate(req.user, function(err, user) {
      if (err) {
        return next(err);
      }
      // we store information needed in token in req.user again
      req.user = {
        id: user.id
      };
      next();
    });
  }
    
  function generateToken(req, res, next) {
    req.token = jwt.sign({
      id: req.user.id,
    }, SECRET, {
      expiresIn: TOKENTIME
    });
    next();
  }
  
  function respond(req, res) {
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }
  
  const authenticate = expressJwt({
    secret: SECRET
  });

  app.use(passport.initialize());  
  app.post('/auth', passport.authenticate(  
    'local', {
      session: false
  }), serialize, generateToken, respond);

  app.get('/me', authenticate, function(req, res) {  
    res.status(200).json(req.user);
  });

  app.get('/twitter_callback', authenticate, (req, res) => {
    res.end("Authorization Succeded");
  });
}