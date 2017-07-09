/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import QuotesService from "../database/QuotesService";
import MongoDbRepository from '../database/mongodb/MongoDbRepository';
import { Quote } from '../models/Quote';

import config from '../config/config';

var express = require('express');
var router = express.Router();
const db = new MongoDbRepository();
const quotesService = new QuotesService();

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

/**
 * Get all quotes
 */
router.get('/' + quotesRoute, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    quotesService.getQuotes().then(quotes => {
        console.log(quotes);
        res.status(200).json(quotes);
    });
});

/**
 * Add new quote
 */
router.post('/' + quotesRoute, (req, res) => {
    if (typeof req.body !== "undefined") {
        res.header('Access-Control-Allow-Origin', '*');
        let quote = new Quote(req.body);

        db.create(quote);

        res.status(200).json({});
    }
});

/**
 * Vote for a quote
 */
router.post('/' + quotesRoute + '/voting', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({});
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
