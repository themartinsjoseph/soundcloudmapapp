//Requires & Global Vars
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var db = require('./models');
var app = express();
var vows = require('vows');
var assert = require('assert');
var util = require('ultil');
var soundcloudPass = require('passport-soundcloud');
var soundcloud = require('soundcloud');

//Set & Use Statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

module.exports = global.SC = {
  initialize (options = {}) {
    // set tokens
    config.set('oauth_token', options.oauth_token);
    config.set('client_id', options.client_id);
    config.set('redirect_uri', options.redirect_uri);
    config.set('baseURL', options.baseURL);
    config.set('connectURL', options.connectURL);
  },

//Routes
//Display the homepage
app.get('/', function(req, res) {
  res.render('index');
});

//Search Soundcloud for local users
app.get('/results', function(req, res) {
  var userInput = req.query.name;
  var qs = {
      s: userInput
  };

  request({
  	url: 'http://www.omdbapi.com',
  	qs: qs
  }, function(error, response, body){
  	if(!error && response.statusCode == 200) {
  		var dataObj = JSON.parse(body);
  		res.render('results', {results: dataObj.Search});
      // res.send(dataObj.Search);
  	};
  });
});

//Search local users for new tracks
app.get('/movies/:imdbID', function(req, res) {
  var qs = {
      i: req.params.imdbID
  };
  request ({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      res.render('movies', {result: dataObj});
      // res.send(dataObj.Search);
    }
  });
});

//Get users latest track
SC.get('/user/183/tracks').then(function(tracks){
  alert('Latest track: ' + tracks[0].title);
});

//Streaming
SC.stream('/tracks/293').then(function(player){
  player.play();
});



vows.describe('passport-soundcloud').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(soundcloud.version);
    },
  },
  
}).export(module);

//Controllers

//Listener
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
