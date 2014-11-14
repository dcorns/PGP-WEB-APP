/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var mongoose = require('mongoose');
var User = require('../models/user');
var auth = require('./authorize');
var Resource = require('../models/resource');
var Note = require('../models/note');


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
    combinePgpGoalresources: function(cb){
      var arraysCombined = obj.goalsrc1.concat(obj.goalsrc2, obj.goalsrc3, obj.goalsrc4, obj.goalsrc5);
      obj.goalsrc1 = this.removeArrayDuplicates('title', arraysCombined);
      obj.goalsrc2 = []; obj.goalsrc3 = []; obj.goalsrc4 = []; obj.goalsrc5 = [];
      cb();
    },
    removeArrayDuplicates: function(searchkey, ary){
      var dupFreeArray = [];
      var exists = false;
      for(var idx = 0; idx < ary.length; idx++){
        for(var nidx = 0; nidx < dupFreeArray.length; nidx++){
          if(ary[idx][searchkey] === dupFreeArray[nidx][searchkey]) exists = true;
        }
        if(!(exists)) dupFreeArray.push(ary[idx]);
        exists = false;
      }

      return dupFreeArray;
    },
    validateSurvey: function (cb){
      var valid = true;
      var err = null;
      //if((!(validate.isAlpha(obj.name))) && (!(typeof obj.name === 'undefined'))){
      //  valid = false;
      //  err = addValErr(err, "Name", "Only Alphanumeric characters are aloud for Name input!");
      //}
      if(((!(obj.rtg1 > 0)) || (!(obj.rtg1 < 6))) && (!(typeof obj.rtg1 === 'undefined'))){
        valid = false;
        err = addValErr(err, "HTML-Assessment", "Select from 1-5 only for HTML rating");
      }
      if(((!(obj.rtg2 > 0)) || (!(obj.rtg2 < 6))) && (!(typeof obj.rtg2 === 'undefined'))){
        valid = false;
        err = addValErr(err, "CSS-Assessment", "Select from 1-5 only for CSS rating");
      }if(((!(obj.rtg3 > 0)) || (!(obj.rtg3 < 6))) && (!(typeof obj.rtg3 === 'undefined'))){
        valid = false;
        err = addValErr(err, "JS-Assessment", "Select from 1-5 only for JavaScript rating");
      }if(((!(obj.rtg4 > 0)) || (!(obj.rtg4 < 6))) && (!(typeof obj.rtg4 === 'undefined'))){
        valid = false;
        err = addValErr(err, "GIT-Assessment", "Select from 1-5 only for GIT rating");
      }if(((!(obj.rtg5 > 0)) || (!(obj.rtg5 < 6))) && (!(typeof obj.rtg5 === 'undefined'))){
        valid = false;
        err = addValErr(err, "DSA-Assessment", "Select from 1-5 only for DataStructures and Algorithms rating");
      }if(((!(obj.rtg6 > 0)) || (!(obj.rtg6 < 6))) && (!(typeof obj.rtg6 === 'undefined'))){
        valid = false;
        err = addValErr(err, "CMD-Assessment", "Select from 1-5 only for Command Line rating");
      }if(((!(obj.rtg7 > 0)) || (!(obj.rtg7 < 6))) && (!(typeof obj.rtg7 === 'undefined'))){
        valid = false;
        err = addValErr(err, "OOP-Assessment", "Select from 1-5 only for Object-Orientated programming rating");
      }
      cb(err,valid);
    },
    addNewUser: function(req, res){
      var user = new User(req.body);
      user.email = user.email.toLowerCase();
      user.roll = 'student';
      var a = auth(user);
      a.encrypt(function (usr) {
        user.save(function (err, usr) {
          if (err){
            console.dir(err);
            return res.status(500).json(err);
          }
          return res.json(user);
        });
      });
    },
    getNote: function(usr, res){
      var newNote = {};
      var payload = Object.create(null);
      Note.findOne({student: usr.email}, function (err, note) {
        if (err) {
          return res.status(500).json(err);
        }
        if (note) {
          //note = this.combineResources(note);
          payload.note = note;
        }
        else{
          newNote.student = usr.email;
          newNote.recComplete = false;
          newNote.rtgComplete = false;
          newNote.name = usr.firstName + ' ' + usr.lastName;
          payload.note = newNote;
        }
        payload.usr = usr;
        return res.status(200).json(payload);
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
};