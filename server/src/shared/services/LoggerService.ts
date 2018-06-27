import * as winston from "winston";

const level = process.env.LOG_LEVEL || 'debug';
export const logger: winston.Logger = new winston.Logger({
    transports: [
    new winston.transports.Console({
        level: level,
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
        colorize: true
    })
    ]
});