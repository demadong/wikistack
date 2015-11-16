var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	swig = require('swig');

var PORT = 3000,
	app = express(),
	wikiRouter = require('./routes/wiki.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// dynamic routing
app.use('/wiki', wikiRouter);

// static routing
app.use(express.static(__dirname + '/public'));

//error handling middleware
app.use(function(req, res, next){
  var err = new Error('could not find route');
  err.status = 404;
  next(err); // passing a truthy value to `next` goes to error middleware
});

// a custom error-handling middleware function
app.use(function(err, req, res, next){ // 4 params -> error-handling middleware
  res.status(err.status || 500).send('ERROR: ' + err.message);
});

app.listen(PORT, function() {
	console.log('Listening to port', PORT);
});