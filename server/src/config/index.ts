export const Config = () => {
    var toml = require('toml-require').install();
    // parse toml main configuration file at ./config/default.toml
    return require('./server.toml');
};
