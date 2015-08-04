/**
 * This rounter handler manages all routes incoming from the web browser.
 */
var express = require('express');
var router = express.Router();
var config = require('config');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: config.get("engine.name")
  });
  res.end();
});

/* GET authors main page. */
router.get('/authors', function (req, res, next) {
  //currentAPIVersion = config.get('engine.currentAPIVersion');
  res.render('authors');
  res.end();
});

/* GET authors submit page. */
router.get('/authors/submit', function (req, res, next) {
  res.render('submitAuthors');
  res.end();
});

/* GET quotes main page. */
router.get('/quotes', function (req, res, next) {
  if (req.query != null && req.query.message != null) {
    console.log(req.query.message);
    res.render('quotes', { message: req.query.message });
  } else {
    res.render('quotes');
  }
  res.end();
});

/* GET quote submit page. */
router.get('/quotes/submit', function (req, res, next) {
  res.render('submitQuotes');
  res.end();
});

/* GET topics main page. */
router.get('/topics', function (req, res, next) {
  res.render('topics');
  res.end();
});

/* GET topics submit page. */
router.get('/topics/submit', function (req, res, next) {
  res.render('submitTopics');
  res.end();
});

module.exports = router;
