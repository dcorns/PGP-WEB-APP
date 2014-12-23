/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var mongoose = require('mongoose');
var User = require('../models/user');
var auth = require('./authorize');
var Resource = require('../models/resource');
var Note = require('../models/note');
var corngoose = require('./corngoose');


module.exports = function (obj) {
  return{
    combineUsers: function (cb) {
      var rArray = [];
      User.find({}, function (err, users) {
        if (err) cb(err, null);
        else {
          users.sort(function(a, b){
            if (a.lastName.toUpperCase() > b.lastName.toUpperCase()) return 1;
            if (a.lastName.toUpperCase() < b.lastName.toUpperCase()) return -1;
            return 0;
          });
          for (var i = 0; i < users.length; i++) {
            for (var ii = 0; ii < obj.length; ii++) {
              if (users[i].email === obj[ii].student) {
                obj[ii].name = users[i].firstName + ' ' + users[i].lastName;
                rArray.push(obj[ii]);
              }
            }
          }
          cb(null, rArray);
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
    },
    addNames: function(cb){
      var rArray = [];
      User.find({roll: 'ta'}, function(err, users){
        if(err) cb(err, null);
        for(var r = 0; r < obj.length; r++) {
          rArray.push(obj[r]);
          rArray[r].name = ' ';
          for (var i = 0; i < rArray[r].resource.length; i++) {
            if(rArray[r].resource[i].addedBy){
              for (var uidx = 0; uidx < users.length; uidx++) {
                //Type conversion will not occur using == convert to string to insure ids match*************************
                if (rArray[r].resource[i].addedBy.toString() === users[uidx]._id.toString()) {
                  rArray[r].resource[i].name = users[uidx].firstName + ' ' + users[uidx].lastName;
                }
              }
            }
          }
        }
        cb(null, rArray);
      });
    },

    addNewUser: function(cb){
      //var user = new User(obj);
      obj.email = obj.email.toLowerCase();
      obj.roll = 'student';
      var a = auth(obj);
      a.encrypt(function (usr) {
        corngoose.dbDocInsert({email:obj.email}, usr, 'users', function(err, docAry){
          if(err){
            return cb(err, null);
          }
          return cb(null, {msg: 'New user '+ docAry[0].email + ' added.'});
      });

      });
    },
    getUserPayload: function(usr, cb){
      var payload ={};
      corngoose.dbDocFind({student: usr.email}, 'notes', function(err, note){
        if(err){
          return cb(err, null);
        }
        if(note[0]){
          combinePgpGoalresources(note[0], function(err, cnote){
            if(err) return cb(err, null);
            payload.note = cnote;
          });
        }
        else{
          payload.note = {};
          payload.note.student = usr.email;
          payload.note.recComplete = false;
          payload.note.preRtgComplete = false;
          payload.note.rtgComplete = false;
          payload.note.name = usr.firstName + ' ' + usr.lastName;
          payload.note.goalsrc1 = [];
          payload.note.goalsrc2 = [];
          payload.note.goalsrc3 = [];
          payload.note.goalsrc4 = [];
          payload.note.goalsrc5 = [];
          payload.note.recsrc1 = [];
          payload.note.recsrc2 = [];
          payload.note.recsrc3 = [];
          payload.note.recsrc4 = [];
          payload.note.recsrc5 = [];
          payload.note.recsrc6 = [];
          payload.note.recsrc7 = [];
        }
        payload.user = usr;
        return cb(null, payload);
      });
    }

  };
  function addValErr(err, errName, errMsg){
    if(!(err)){
      err = {};
    }
    if(!(errName[errName])){
      err[errName] = errMsg;
    }
    return err;
  }

  function combinePgpGoalresources(noteIn, cb){
    var arraysCombined = noteIn.goalsrc1.concat(noteIn.goalsrc2, noteIn.goalsrc3, noteIn.goalsrc4, noteIn.goalsrc5);
    noteIn.goalsrc1 = removeArrayDuplicates('title', arraysCombined);
    noteIn.goalsrc2 = []; noteIn.goalsrc3 = []; noteIn.goalsrc4 = []; noteIn.goalsrc5 = [];
    cb(null, noteIn);
  }
  function removeArrayDuplicates(searchkey, ary) {
    var dupFreeArray = [];
    var exists = false;
    for (var idx = 0; idx < ary.length; idx++) {
      for (var nidx = 0; nidx < dupFreeArray.length; nidx++) {
        if (ary[idx][searchkey] === dupFreeArray[nidx][searchkey]) exists = true;
      }
      if (!(exists)) dupFreeArray.push(ary[idx]);
      exists = false;
    }
    return dupFreeArray;
  }
};