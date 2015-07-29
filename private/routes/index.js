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
});

/* GET authors main page. */
router.get('/authors', function (req, res, next) {
  //currentAPIVersion = config.get('engine.currentAPIVersion');
  res.render('authors');
});

/* GET authors submit page. */
router.get('/authors/submit', function (req, res, next) {
  res.render('submitAuthors');
});

/* GET quotes main page. */
router.get('/quotes', function (req, res, next) {
  res.render('quotes');
});

/* GET quote submit page. */
router.get('/quotes/submit', function (req, res, next) {
  res.render('submitQuotes', {
  });
});

/* GET topics main page. */
router.get('/topics', function (req, res, next) {
  res.render('topics');
});

/* GET topics submit page. */
router.get('/topics/submit', function (req, res, next) {
  res.render('submitTopics', {
  });
});

module.exports = router;