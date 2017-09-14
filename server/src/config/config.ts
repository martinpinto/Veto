class Config {
    public config: any;

    constructor() {
        var toml = require('toml-require').install();
        // parse toml main configuration file at ./config/default.toml
        this.config = require('./server.toml');
    }
}

export default new Config().config;