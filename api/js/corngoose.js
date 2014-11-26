/**
 * Created by dcorns on 11/25/14.
 */
'use strict';
var mongoClient = require('mongodb').MongoClient;
var User = require('../models/user');
var Note = require('../models/user');
var BSON = require('mongodb').BSONPure;
  //var mongoUri = process.env.MONGOLAB_URI ||
  //process.env.MONGOHQ_URL ||
  //'mongodb://localhost/onlineResumeDev';
module.exports = (function () {
  var procE = process.env;
  var mongoUri;
  return{
    startDB: function(dbPath){
      this.setDbPath(dbPath);
    },
    setDbPath: function(dbPath){
      mongoUri = procE.MONGOLAB_URI || procE.MONGOHQ_URL || 'mongodb:' + dbPath;
      return mongoUri;
    },
    showDbPath: function(){
      return mongoUri;
    },
    dbConnect: function(dbPath, cb){
      mongoClient.connect(dbPath, function(err, db){
        if(err) {
          return cb(err, null);
        }
        return cb(null, db);
      });
    },
    getCollection: function(collectionName, cb){
      this.dbConnect(mongoUri, function(err, db) {
        if (err) {
          return cb(err, null);
        }
        db.collection(collectionName).find({}).toArray(function (err, collection) {
          if (err){
            return cb(err, null);
          }
          db.close(function () {
            return cb(null, collection);
          });
        });
      });
    },
    dbDocReplace: function(doc, collectionName, cb){
      this.dbConnect(mongoUri, function(err, db){
        if (err) return cb(err, null);
        var id = BSON.ObjectID.createFromHexString(doc._id);
        var query = {'_id': id};
        delete doc._id;
        db.collection(collectionName).update(query, doc, function(err, updated) {
          if (err) return cb(err, null);
          db.close(function(){
            return cb(null, updated);
          });
        });
      });
    },
    dbDocFind: function(queryObj, collectionName, cb){
      this.dbConnect(mongoUri, function(err, db){
        if(queryObj._id) queryObj._id = BSON.ObjectID.createFromHexString(queryObj._id);
          db.collection(collectionName).find(queryObj).toArray(function(err, cursor){
            if (err) return cb(err, null);
            return cb(null, cursor);
          });
      });
    }
  };
})();