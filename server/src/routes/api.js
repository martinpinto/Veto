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
const db = new ModelService(new MongoDbRepository());

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
    if (req.body) {
        message = req.body.message;
        topic = req.body.topic;
        hashtags = req.body.hashtags;
        source = req.body.source;
        author = req.body.author;
        type = 'quote';
        console.log(req.body.message);
    }
    db.find({ _type: new Project()._type }, (err, projects) => {
        res.header('Access-Control-Allow-Origin', '*');
        if (!err) {
            console.log(projects);
            res.status(200).json(projects);
        } else {
            res.status(500).send('An error has occurred!');
        }
    });
});

router.post('/' + quotesRoute, (req, res) => {
    if (typeof req.body !== "undefined") {
        res.header('Access-Control-Allow-Origin', '*');
        let quote = new Quote(req.body);

        db.create(quote);

        res.status(200).json({});
    }
    /*
    if (typeof req.body !== 'undefined') {
        let project = new Project(req.body);
        db.create(project, (err, newProject) => {
            res.header('Access-Control-Allow-Origin', '*');
            if (!err) {
                console.log(newProject);
                res.status(200).json(newProject);
            } else {
            }
        });
    } else {
        res.status(200).json({});
    }
    */
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
