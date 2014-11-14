/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
var User = require('../models/user');
var auth = require('../js/authorize');
var dbutils = require('../js/dbutils');
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
          var db = dbutils();
          db.getNote(usr, res);
        });
      }
      else {
        return res.status(401).json(usr);
      }
    });
  });

};