/**
 * Created by dcorns on 11/9/14.
 */
'use strict';
var auth = require('../js/authorize');
var Note = require('../models/note');
var db = require('../js/dbutils');

module.exports = function(app){
  var baseUrl = '/api/v_0_0_1/userForm';

  app.get(baseUrl, function (req, res){
    var token = req.headers.authorization;
    var user = {};
    var a = auth(user);
    a.getTokenInfo(function(usr){
      Note.findOne({student: usr.email}, function (err, note) {
        if (err) {
          return res.status(500).json(err);
        }
        if (note) {
          var rmdups = db(note);
          rmdups.combinePgpGoalresources(function(){
            return res.status(200).json(note);
          });
        }
        else {
          return res.status(201).send(note);
        }
      })
    }, token);
    return res.status(200);
  });

  app.post(baseUrl, function (req, res) {
    var token = req.headers.authorization;
    var user = {};
    var a = auth(user);
    a.getTokenInfo(function (usr) {
      var valid = db(req.body);
      valid.validateSurvey(function (err, result){
        if(err){
          console.dir(err);
          return res.status(400).json(err);}
        if(result){
          Note.findOne({student: usr.email}, function (err, note) {
            if (err) console.error(err);
            if (note) {
              Note.findOneAndUpdate({student: note.student}, req.body, function (err, resNote) {
                if (err) return res.status(500).json(err);
                return res.status(202).json(resNote);
              });
            }
            else {
              var newNote = new Note(req.body);
              newNote.student = usr.email;
              newNote.save(function (err, resNote) {
                if (err) return res.status(505).json(err);
                return res.status(202).json(resNote);
              });
            }
          })
        }
      });
    }, token);
  });
};