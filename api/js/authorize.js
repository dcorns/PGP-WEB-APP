/**
 * Created by dcorns on 10/4/14.
 */
'use strict';

var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

module.exports = function (usrObj) {
  return{
    authenticate: function (cb) {
      var usr = User.where({email: usrObj.email.toLowerCase()});
      var result = {user: false, password: false};
      usr.findOne(function (err, user) {
        if (user) {
          testPassword(user, function(res){
            if(res){
              result.user = true; result.password = true;
              return cb(result);
            }
            else{
              result.password = 'The password you entered failed authentication';
              return cb(result);
            }
            });

        }
        else {
          result.user = 'The email you entered is not a registered user';
          return cb(result);
        }
      });
      usr.findOne();
      function testPassword(usr, cb) {
        bcrypt.compare(usrObj.password, usr.password, function (err, res) {
         return cb(res);
        });
      }
    },
    encrypt: function (cb) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(usrObj.password, salt, function (err, hash) {
          usrObj.password = hash;
          cb(usrObj);
        });
      });
    },
    makeToken: function (cb) {
      var payload = {email: usrObj.email};
      var secret = usrObj.password;
      usrObj.atoken = jwt.encode(payload, secret);
      User.findOneAndUpdate({'email': usrObj.email}, {atoken: usrObj.atoken}, function (err, resUser) {
        if (err) console.error(err);
        cb(resUser);
      });
    },
    getTokenInfo: function (cb, tk) {
      var usr = User.where({atoken: tk});
      usr.findOne(function (err, resUser) {
        if (err) console.log(err);
        cb(resUser);
      });
      usr.findOne();
    }
  }
};