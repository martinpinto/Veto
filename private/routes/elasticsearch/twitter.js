var express = require('express');
var router = express.Router();
var elastic = require('../../../config/elasticsearch');
var config = require('config');

// no need to write down get('/twitter/", ...) already defined in app.js
router.get('/', function (req, res) {
    console.log(req.query.name);
    console.log(req.query);
    res.send(200);
});

/* 
 http://localhost:9200/elastictwitter/tweets
 with sample tweets like:
 curl -X PUT http://localhost:9200/elastictwitter/tweets/1 -d '
 {"tweet": { "user": "martin", "post_date": "2015-02-14T16:58:10", "message": "This is a tweet" } }'
*/
var elasticSearchIndex = config.get('engine.dbConfig.elasticsearch.index');
var elasticSearchType = config.get('engine.dbConfig.elasticsearch.type');

// fetches an existing tweet
router.get("/get_tweet/:id", function (req, res, next) {
  console.log(elastic);
    elastic.client.get({
        index: elasticSearchIndex,
        type: elasticSearchType,
        id: req.params.id
    }, function (error, response) {
        console.log(response);
        if (response.found) {
            console.log("Tweet --> id: " + response._id + "; message: " + response._source.tweet.message + "; user: " + response._source.tweet.user + "; post_date: " + response._source.tweet.post_date);
            res.send(response._source.tweet);
        } else {
            res.send("Could not find any tweets with id: " + req.params.id);
        }
    });
});

// indexes a new tweet
router.post("/index_tweet/", function (req, res, next) {
    console.log(req);
    console.log(res);
    elastic.client.index({
        index: elasticSearchIndex,
        type: elasticSearchType,
        body: {
            "tweet": {
                "user": req.query.user,
                "post_date": new Date(),
                "message": req.query.message
            }
        }
    }, function (error, response) {
        console.log(response);
        res.send(req.query.message);
    });
});

// searches for an existing tweet
router.get("/search_tweet/:search_string", function (req, res, next) {
    next();
});

module.exports = router;