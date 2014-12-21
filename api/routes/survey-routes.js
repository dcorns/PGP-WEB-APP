/**
 * Created by dcorns on 11/9/14.
 */
'use strict';
var auth = require('../js/authorize')
  //,Note = require('../models/note')
  ,dbutils = require('../js/dbutils')
  ,validation = require('../js/validation'),
  corngoose = require('../js/corngoose');

module.exports = function(app){
  var baseUrl = '/api/v_0_0_1/userForm';

  app.get(baseUrl, function (req, res){
    var token = req.headers.authorization;
    var user = {};
    var a = auth(user);
    a.getTokenInfo(token, function(err, usr){
      if(err){
        return res.status(500).json(err);
      }
      var db = dbutils();
      db.getUserPayload(usr, function(err, pl){
        if (err) {
          return res.status(500).json(err);
        }
          return res.status(200).send(pl.note);
      });
    });
    return res.status(500);
  });

  app.post(baseUrl, function (req, res) {
    var token = req.headers.authorization;
    var user = {};
    var a = auth(user);
    a.getTokenInfo(token, function (err, usr) {
      if(err){
        res.status(500).json(err);
      }
      var valid = validation();
      valid.validateSurvey(req.body, function (err, result){
        if(err){
          console.dir(err);
          return res.status(400).json(err);}
        if(result){
          corngoose.dbDocFind({student: usr.email}, 'notes', function(err, note){
            if(err) console.error(err);
            if(note[0]){
              corngoose.dbDocUpdate({student: usr.email}, req.body, 'notes', function(err, success){
                console.log('sr51'); console.dir(success);
                if(err) return res.status(500).json(err);
                return res.status(202).json(success);
              });
            }
            else{
              corngoose.dbDocInsert({student: usr.email}, req.body, 'notes', function(err, resNote){
                if(err) return res.status(505).json(err);
                return res.status(202).json(resNote[0]);
              });
            }
          });
        }
      });
    });
  });
};