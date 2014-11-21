/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
var User = require('../models/user');
var auth = require('../js/authorize');
var dbutils = require('../js/dbutils');
var Note = require('../models/note');
var validation = require('../js/validation');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/login';

  //Login
  app.post(baseUrl, function (req, res) {
    var validate = validation();
    validate.validateLogin(req.body, function(valid, err){
      if(!(valid)){
        return res.status(400).json(err);
      }
      else{
        //req.body.email = req.body.email.toLowerCase();
        var a = auth(req.body);
        a.authenticate(function (usr) {
          if (usr.user && usr.password) {
            a.makeToken(function (usr) {
              var db = dbutils();
              db.getUserPayload(usr, function(err, payload){
                if(err){
                  return res.status(500).json(payload.err);
                }
                return res.status(200).json(payload);
              });
            });
          }
          else {
            return res.status(401).json(usr);
          }
        });
      }
    });

  });

};