var express = require('express');
var router = express.Router();
var config = require('config');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: "Poliquo"
  });
});

/* GET authors main page. */
router.get('/authors', function (req, res, next) {
  currentAPIVersion = config.get('engine.currentAPIVersion');
  if (currentAPIVersion)
    res.redirect('/api/v' + currentAPIVersion + '/authors');
  else
    res.redirect('/api/authors');
});

/* GET quotes main page. */
router.get('/quotes', function (req, res, next) {
  res.render('quotes', {
  });
});

/* GET quote submit page. */
router.get('/submit', function (req, res, next) {
  res.render('submit', {
  });
});

module.exports = router;