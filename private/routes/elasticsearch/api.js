var express = require('express');
var router = express.Router();
var elastic = require('../../../config/elasticsearch');
var config = require('config');

// Elasticsearch information
var esIndex = config.get('engine.dbConfig.elasticsearch.index');
var esTypes = config.get('engine.dbConfig.elasticsearch.types');
var esTypeQuotes = esTypes[0]; // quotes elasticsearch type
var esTypeAuthors = esTypes[1]; // authors elasticsearch type
var esTypeTopics = esTypes[2]; // topics elasticsearch type


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
//        index: esIndex,
//        type: esTypeAuthors
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
        index: esIndex,
        type: esTypeAuthors,
        id: req.params.id
    }, function (error, response) {
        console.log(response);
        if (response.found) {
            
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
        index: esIndex,
        type: esTypeAuthors,
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
 * Searches quotes
 * @param
 * @param
 * @param
 */
router.get('/quotes/search', function (req, res) {
  elastic.client.search({
    index: esIndex,
    q: req.params.q
  }, function (error, response) {
    console.log(response);
    if (response) {
      console.log('quote: ' + response._source);
    } else {
      console.log('Could not find any quotes');
    }
  });
  res.render('quotes');
});

/**
 * Fetches all quotes
 * @param
 * @param
 * @param
 */
router.get('/quotes', function (req, res) {
  elastic.client.search({
    index: esIndex,
    type: esTypeQuotes,
    q: 'type:quote',
    size: 1000
  }, function (error, response) {
    if (response) {
      res.json(response.hits.hits);
    } else {
      res.send('Could not find any quotes');
    }
  });
});

/** 
 *  Fetches an existing quote by ID 
 *  @param id the ID of the quote
 */
router.get('/quotes/:id', function (req, res) {
  elastic.client.get({
    index: esIndex,
    type: esTypeQuotes,
    id: req.params.id
  }, function (error, response) {
    console.log(response);
    if (response) {
      console.log('quote: ' + response._source);
    } else {
      console.log('Could not find any quotes');
    }
  });
  res.render('quotes');
});

/**
 *  Updates an existing quote
 *  @param id the ID of the quote
 */
router.put('/quotes/:id', function (req, res) {
  console.log(req.params.id);
});

/** 
 *  Inserts a new quote 
 *  @param
 *  @param
 *  @param
 */
router.post('/quotes', function (req, res) {  
  var message, topic, hashtags, source, author, type;
  if (req.body) {
    message = req.body.message;
    topic = req.body.topic;
    hashtags = req.body.hashtags;
    source = req.body.source;
    author = req.body.author;
    type = 'quote';
    console.log(req.body.message);
  }

  elastic.client.index({
    index: esIndex,
    type: esTypeQuotes,
    body: {
        "type": type,
        "data": {
            "message": message,
            "topic": topic,
            "hashtags": hashtags,
            "source": source,
            "author": author
        }
    }}, function (error, response) {
        console.log(response);
        res.send(req.query.message);
  });
  res.redirect('/quotes');//, {
  //  response: "Quote successfully added!"
  //});
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