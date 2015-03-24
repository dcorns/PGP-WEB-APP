/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
var auth = require('../js/authorize');
var validation = require('../js/validation');
var dbutils = require('../js/dbutils');
module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/login';
  //Login
  app.post(baseUrl, function (req, res) {
    console.dir(req.body);
    var validate = validation();
    validate.validateLogin(req.body, function(valid, err){
      if(!(valid)){
        return res.status(400).json(err);
      }
      else{
        var a = auth(req.body);
        a.authenticate(function (usr) {
          if (usr.user && usr.password) {
            a.makeToken(function (err, usr) {
              if(err){
                return res.status(500).json(err);
              }
              if(usr.roll === 'student'){
                var db = dbutils();
                db.getUserPayload(usr, function(err, payload){
                  if(err){
                    return res.status(500).json(payload.err);
                  }
                  return res.status(200).json(payload);
                });
              }
              else{
                return res.status(200).json({user: usr, note: null});
              }

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