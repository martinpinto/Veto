#!/usr/bin/env node

/**
 * Module dependencies.
 */
import * as config from "./config/config";
import * as http from "http";
import * as debug from "debug";
import App from "./App";

debug("ts-express:server");

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.default.api.port || '3000');
const ip = process.env.OPENSHIFT_NODEJS_IP || config.default.api.host || "127.0.0.1";

App.set('port', port);
App.set('domain', ip);

/**
 * Create HTTP server.
 */
const server = http.createServer(App);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// TODO: add bootstraping capabilities
bootstrap();

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
}
