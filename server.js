'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();
var corngoose = require('./api/js/corngoose');
var usefulfunc = require('./api/js/usefulfunc');

corngoose.startDB('//localhost/notes-development');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/notes-development');
app.get('/',function(req, res){
  var token = req.get('authorization');
  console.log(token);
  if(token){
    var converted = usefulfunc.convert64RFC2045ToAscii256(token);
    console.log(converted);
  }

  console.log('request made');
    res.set('WWW-Authenticate', 'Basic realm=\"Authentication Required\"');
    res.status(401);
  res.send();
});
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));
app.use(bodyparser.json());
require('./api/routes/pgp-routes')(app);
require('./api/routes/user-routes')(app);
require('./api/routes/login-routes')(app);
require('./api/routes/resource-routes')(app);
require('./api/routes/survey-routes')(app);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function () {
  console.log('server running on port 3000');
});
