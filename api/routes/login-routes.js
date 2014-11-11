/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
var User = require('../models/user');
var auth = require('../js/authorize');
var db = require('../js/dbutils');
var Note = require('../models/note');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/login';

  //Login
  app.post(baseUrl, function (req, res) {
    console.log('login-routes(20)');
    req.body.email = req.body.email.toLowerCase();
    console.log(req.body);
    var a = auth(req.body);
    a.authenticate(function (usr) {
      if (usr.user && usr.password) {
        a.makeToken(function (usr) {
          Note.findOne({student: usr.email}, function (err, note) {
            if (err) {
              return res.status(500).json(err);
            }
            if (note) {
              var rmdups = db(note);
              rmdups.combinePgpGoalresources(function(){
              });
            }
            var payload = Object.create(null);//block inheritance
            payload.usr = usr;
            payload.note = note;
            return res.status(200).json(payload);
          });
        });
      }
      else {
        return res.status(401).json(usr);
      }
    });
  });

};