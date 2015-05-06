'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();
var corngoose = require('./api/js/corngoose');
var usefulfunc = require('./api/js/usefulfunc');
var auth = require('./api/js/authorize');

corngoose.startDB('//localhost/notes-development');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/notes-development');

app.use(bodyparser.json());


app.get('/',function(req, res){
  var authHead = req.get('authorization');
  console.log(authHead);
  if(authHead){
    var converted = usefulfunc.convert64RFC2045ToAscii256(authHead);
    console.log(converted);
    var authenticate = auth(null);
    authenticate.basicAuth(converted,function(err,authenticated){
      if(err){
        res.status(417);
        res.send();
      }
      if(authenticated){
        app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));
        res.status(200);
        res.sendFile(__dirname + '/build/index.html');
      }
      else{
        basicAuthFailed(true);
      }
    });
  }
  else{
    basicAuthFailed(false);
  }
  function basicAuthFailed(hasHead){
    var msg = '\"Authentication Required\"';
    if(hasHead){
      msg = '\"Credentials Failed!\"';
    }
    res.set('WWW-Authenticate', 'Basic realm= ' + msg);
    res.status(401);
    res.send();
  }

});

require('./api/routes/pgp-routes')(app);
require('./api/routes/user-routes')(app);
require('./api/routes/login-routes')(app);
require('./api/routes/resource-routes')(app);
//require('./api/routes/survey-routes')(app);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function () {
  console.log('server running on port 3000');
});
