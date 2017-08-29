class Config {
    public config: any;

    constructor() {
        var toml = require('toml-require').install();
        // parse toml main configuration file at ./config/default.toml
        this.config = require('./server.toml');
    }

    public getFullMongoDbUrl() {
        let mongodb = this.config.database.mongodb;
        // e.g. mongodb://localhost:27017/myproject';
        return "mongodb://"
            + mongodb.baseurl
            + ":"
            + mongodb.port
            + "/"
            + mongodb.database;
    }
}

export default new Config().config;