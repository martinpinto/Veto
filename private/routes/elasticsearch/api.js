var express = require('express');
var router = express.Router();
var elastic = require('../../../config/elasticsearch');
var config = require('config');

var elasticSearchIndex = config.get('engine.dbConfig.elasticsearch.index');
var elasticSearchType = config.get('engine.dbConfig.elasticsearch.type');

/** requests validator */
//router.use(function (req, res, next) {
//  var method = '';
//  switch(method) {
//      
//    case 'authors':
//      
//      break;
//      
//    case 'quotes':
//      
//      break;
//         
//    case 'subjects':
//      
//      break;
//  }
//});

/** 
 *  Test route 
 *  sends HTTP status 200 to show server is working OK. 
 *  @return an HTTP status 200
 */
router.get('/', function (req, res) {
    console.log(req.query.name);
    console.log(req.query);
    res.send(200);
});

/**
 * Fetches all authors
 * @param
 * @param
 * @param
 */
router.get('/authors/', function (req, res) {
//  elastic.client.get({
//        index: elasticSearchIndex,
//        type: elasticSearchType
//    }, function (error, response) {
//        console.log(response);
//        if (response.found) {
//            console.log('message: ' + response._source.tweet.message + 
//                        '; user: ' + response._source.tweet.user + 
//                        '; post_date: ' + response._source.tweet.post_date);
//            res.send(response._source.tweet);
//        } else {
//            res.send('Could not find any tweets');
//        }
    res.render("authors");
    
});

/** 
 *  Fetches an existing author by ID 
 *  @param id the ID of the author of the quote
 */
router.get('/authors/:id', function (req, res, next) {
  console.log(elastic);
    elastic.client.get({
        index: elasticSearchIndex,
        type: elasticSearchType,
        id: req.params.id
    }, function (error, response) {
        console.log(response);
        if (response.found) {
            console.log('id: ' + response._id + 
                        '; message: ' + response._source.tweet.message + 
                        '; user: ' + response._source.tweet.user + 
                        '; post_date: ' + response._source.tweet.post_date);
            res.send(response._source.tweet);
        } else {
            res.send('Could not find any tweets with id: ' + req.params.id);
        }
    });
});

/**
 *  Updates an existing author
 *  @param id the ID of the author
 */
router.put('/authors/:id', function (req, res) {
  
});

/** 
 *  Inserts a new author 
 *  @param
 *  @param
 *  @param
 */
router.post('/authors/', function (req, res, next) {
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

/**
 *  Deletes an existing author
 *  @param id the ID of the author
 */
router.delete('/authors/:id', function (req, res) {
  
});

/**
 * Fetches all quotes
 * @param
 * @param
 * @param
 */
router.get('/quotes/', function (req, res) {
  
});

/** 
 *  Fetches an existing quote by ID 
 *  @param id the ID of the quote
 */
router.get('/quotes/:id', function (req, res) {
  
});

/**
 *  Updates an existing quote
 *  @param id the ID of the quote
 */
router.put('/subjects/:id', function (req, res) {
  
});

/** 
 *  Inserts a new quote 
 *  @param
 *  @param
 *  @param
 */
router.post('/quotes/', function (req, res) {
  
});

/**
 *  Deletes an existing quote
 *  @param id the ID of the quote
 */
router.delete('/quotes/:id', function (req, res) {
  
});

/**
 * Fetches all subjects
 * @param
 * @param
 * @param
 */
router.get('/subjects/', function (req, res) {
  
});

/** 
 *  Fetches an existing suubject by ID 
 *  @param id the ID of the subject of the quote
 */
router.get('/subjects/:id', function (req, res) {
  
});

/**
 *  Updates an existing subject
 *  @param id the ID of the subject
 */
router.put('/subjects/:id', function (req, res) {
  
});

/** 
 *  Inserts a new subject 
 *  @param
 *  @param
 *  @param
 */
router.post('/subjects/', function (req, res) {
  
});

/**
 *  Deletes an existing subject
 *  @param id the ID of the subject
 */
router.delete('/subjects/:id', function (req, res) {
  
});

module.exports = router;