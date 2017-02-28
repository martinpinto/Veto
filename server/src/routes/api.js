/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import ModelService from '../database/ModelService';
import MongoDbRepository from '../database/mongodb/MongoDbRepository';
import { Quote } from '../models/Quote';

import config from '../config/config';

var express = require('express');
var router = express.Router();
const db = new MongoDbRepository();

/**
 *  Config Parameters
 */
let quotesRoute = config.api.routes[0];
let usersRoute = config.api.routes[1];

/**
 *  Test route
 *  sends HTTP status 200 to show server is working OK.
 *  @return an HTTP status 200
 */
router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({ "started": express.get('startTime') });
});

///////////////////////////////// QUOTES /////////////////////////////////

router.get('/' + quotesRoute, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    db.find(new Quote(), {}).then((quotes) => {
        console.log("api");
        console.log(quotes);
        res.status(200).json(quotes);
    });
});

router.post('/' + quotesRoute, (req, res) => {
    if (typeof req.body !== "undefined") {
        res.header('Access-Control-Allow-Origin', '*');
        let quote = new Quote(req.body);

        db.create(quote);

        res.status(200).json({});
    }
});

router.patch('/' + quotesRoute, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({});
});

router.delete('/' + quotesRoute, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({});
});

export default router;
module.exports = router;


///////////////////////////////// AUTHORS /////////////////////////////////

///////////////////////////////// TOPICS /////////////////////////////////
