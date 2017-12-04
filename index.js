var express = require('express');
var path = require('path');
var http= require('http');
var mongoose = require('mongoose');
var User = require('./models/users');


const mainController = require('./controllers/main.controller.js');

var uristring = process.env.MONGODB_URI || process.env.MONGOLAB_RED_URI || 'mongodb://localhost/';

var theport = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(uristring, function (err, res){
  if (err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }
  else{
    console.log('Succeeded connected to: ' + uristring);
  } 
});

var app = express();

app.set('port', theport);

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', function(request, response) {
  response.render('pages/index')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');
/**
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
**/

        var userSchema = new mongoose.Schema({
          username: String,
          password: String

        });

    app.get('/index', function(req, res) {
        res.render('pages/index');  
    })

    app.get('/login', function(req, res) {
        res.render('pages/login');
    })

    app.get('/signup', function(req, res) {
        res.render('pages/signup');
    })

    app.get('/search', mainController.getSearch);

    app.post('/locations/newId', mainController.newLocation);

    app.post('/search/newUser', mainController.createUser);
