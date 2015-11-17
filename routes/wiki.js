var express = require('express'),
	router = express.Router(),
	models = require('../models/'),
	Page = models.Page,
	User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.content
    // status: req.body.status,
  });
  console.log(page.title, page.content);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save().then(function(savedPage){
  	console.log(savedPage);
  	res.redirect(savedPage.route);
  }).then(null, next);
  // -> after save -> res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
	Page.findOne({urlTitle: req.params.urlTitle}).exec().then(function(page){
		res.render('wikipage', {page:page});
	})
});

module.exports = router;