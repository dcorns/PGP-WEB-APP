/**
 * Created by dcorns on 10/2/14.
 */
'use strict';

var User = require('../models/user');

var BSON = require('mongodb').BSONPure; //npm install mongodb


exports.landing = function(req, res){
  res.set('Status','200');
  res.render('index.html');
};

exports.deleteUser = function(req, res){
  var id = BSON.ObjectID.createFromHexString(req.params.id);
  console.dir(req.params.id);
  db.collection('users').remove({
    _id: id
  }, function(err, user){
    if (err)
      res.send(err, user);
    res.json({
      message: 'User deleted!'
    });
  });
};

exports.getAllUsers = function(req, res) {
  db.collection('users').find().toArray(function(err, docs){
    if(err)
      res.send(err);
    res.json(docs);
    console.dir(docs);
    console.dir('End of function');
  });
};