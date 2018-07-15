import * as appRoot from 'app-root-path';
import * as winston from 'winston';

const level = process.env.LOG_LEVEL || 'debug';

// define the custom settings for each transport (file, console)
const options = {
    file: {
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    }
};

export const logger: winston.Logger = new winston.Logger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toLocaleTimeString();
            },
            colorize: true,
            handleExceptions: true,
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
};
