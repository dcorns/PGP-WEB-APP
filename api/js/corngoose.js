/**
 * Created by dcorns on 11/25/14.
 */
'use strict';
var mongoClient = require('mongodb').MongoClient;
//var User = require('../models/user');
var Note = require('../models/user');
var BSON = require('mongodb').BSONPure;
module.exports = (function () {
  var procE = process.env,
    mongoUri,
    db;
  return{
    startDB: function(dbPath){
      this.setDbPath(dbPath);
        this.dbConnect(mongoUri, function(err, dbin){
          if (err){
            console.log('Failed to connect to ' + mongoUri);
            console.error(err);
            throw err;
          }
          db = dbin;
          console.log('Connected to '+ mongoUri + '.');
        });
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
    dbDisConnect: function(cb){
      db.close(function(){
        return cb(null, 'Database connection closed');
      });
    },
    getCollection: function(collectionName, cb){
        db.collection(collectionName).find({}).toArray(function (err, collection) {
          if (err){
            return cb(err, null);
          }
          return cb(null, collection);
        });
    },
    dbDocReplace: function(doc, collectionName, cb){
        var id = BSON.ObjectID.createFromHexString(doc._id);
        delete doc._id;
        id = {'_id': id};
        db.collection(collectionName).update(id, doc, function(err, updated) {
          if (err) return cb(err, null);
          return cb(null, updated);
        });
    },
    dbDocFind: function(queryObj, collectionName, cb){
        if(queryObj._id) queryObj._id = BSON.ObjectID.createFromHexString(queryObj._id);
          db.collection(collectionName).find(queryObj).toArray(function(err, doc){
            if (err) return cb(err, null);
            return cb(null, doc);
          });
    },
    dbDocUpdate: function(queryObj, updateObject, collectionName, cb){
      this.dbDocFind(queryObj, collectionName, function(err, doc){
        if(err){
          return cb(err, null);
        }
        var updateObj = {$set: updateObject};
        db.collection(collectionName).update(queryObj, updateObj, function(err, result){
          if(err){
            return cb(err, null);
          }
          return cb(null, result);
        });
      });
    },
    dbDocInsert: function(keyObj, docData, collectionName, cb){
      this.dbDocFind(keyObj, collectionName, function(err, docAry){
        if(err){
          return cb(err, null);
        }
        if(docAry[0]){
          return cb('Key Object already exists in database', null);
        }
        db.collection(collectionName).insert(docData, {w:1}, function(err, insertDocArray){

          if(err){
            return cb(err, null);
          }
          return cb(null, insertDocArray);
        });
      });
    },
    dbDocRemove: function(keyObj, collectionName, cb){
      db.collection(collectionName).remove(keyObj, {w:1}, function(err, result){
        if (err){
          return cb(err, null);
        }
        return cb(null, result);
      });
    }
  };
})();