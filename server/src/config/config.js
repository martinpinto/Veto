var toml = require('toml-require').install();
// parse toml main configuration file at ./config/default.toml
var config = require('./server.toml');

config.getFullMongoDbUrl = () => {
    let mongodb = config.database.mongodb;
    // e.g. mongodb://localhost:27017/myproject';
    return "mongodb://"
        + mongodb.baseurl
        + ":"
        + mongodb.port
        + "/"
        + mongodb.database;
};

module.exports = config;