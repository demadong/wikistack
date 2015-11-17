var express = require('express'),
  router = express.Router(),
  models = require('../models/'),
  Page = models.Page,
  User = models.User;

  router.get('/', function(req, res, next) {
    Page.find().exec()
    .then(function(pages){
      res.render('index', {pages: pages});
    })
    .then(null, next);
  });

  router.get('/search', function(req, res, next){
    res.render('search');
  });

  router.get('/search', function(req, res, next){
    res.json(req.query.tag);
  });


module.exports = router;
