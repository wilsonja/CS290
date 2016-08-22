var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3030);
app.use(express.static('public'));

/* set up for GET requests */
app.get('/', function(req,res){
  var qParams = [];   // stores query request data
  for (var p in req.query){
    qParams.push({'name': p, 'value': req.query[p]})
  }
  var context = {};
  context.getQuery = qParams;
  res.render('get', context);
});

/* set up for POST requests */
app.post('/', function(req,res){
  var qParams = [];		// stores query request data
  var bParams = [];		// stores body request data
  /* for POST in a query */
  for (var p in req.query){
    qParams.push({'name': p, 'value': req.query[p]})
  }
  /* for POST in body */
  for (var p in req.body){
    bParams.push({'name': p, 'value': req.body[p]})
  }
  var context = {};
  context.postQuery = qParams;
  context.postBody = bParams;
  res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err,req,res,next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('GET/POST checker started on port ' + app.get('port') + '; press Ctrl-C to terminate');
});
