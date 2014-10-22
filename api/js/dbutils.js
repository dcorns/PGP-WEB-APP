/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var mongoose = require('mongoose');
var User = require('../../models/user');
var Notes = require('../../models/note');
var Resource = require('../../models/resource');

module.exports = function (obj) {
  return{
    combineUsers: function (cb) {
      var badNews = null;
      User.find({}, function (err, users) {
        if (err) cb(err, null);
        else {
          //obj.users = users;
          for (var i = 0; i < obj.length; i++) {
            for (var ii = 0; ii < users.length; ii++) {
              if (obj[i].student === users[ii].email) {
                obj[i].name = users[ii].firstName + ' ' + users[ii].lastName;
              }
            }
          }
          cb(null, obj);
        }
      });
    },
    spliceResource: function (cb){
      Resource.findOne({'resourceFor': obj.resourceFor}, function (err, resrc){
        if (err) cb(err, null);
        var idx = 0;
        var ln = resrc.resource.length;
        for (var i = 0; i < ln; i++) {
          if (resrc.resource[i].title === obj.resource.title) {
            idx = i;
          }
        }
        resrc.resource.splice(idx, 1);
        resrc.save();
        cb(null, obj.resource);
      });
    },
    pushResource: function (cb) {
      var datain = new Resource({resourceFor: obj.resourceFor});
      Resource.findOne({'resourceFor': obj.resourceFor}, function (err, resrc) {
        if (err) cb(err, null);
        if (!(resrc)) {
          datain.save(function (err, resrcfor) {
            if (err) cb(err, null);
            pushit(resrcfor._id);
          });
        }
        else {
          pushit(resrc._id);
        }
      });
      function pushit(id) {
        Resource.findByIdAndUpdate(
          id,
          {$push: {'resource': obj.resource}},
          {safe: true, upsert: true},
          function (err, resData) {
            console.log(err);
            cb(null, obj.resource);
          }
        );
      }
    }
  }
};