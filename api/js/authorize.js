/**
 * Created by dcorns on 10/4/14.
 */
'use strict';

var User = require('../../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

module.exports = function(usrObj) {
  return{
    echo: function(){
      return usrObj;
    },
    authenticate: function(test) {
      var usr = User.where({email: usrObj.email});
      usr.findOne(function (err, user) {
        if (err) console.log(err);
        var result = {user: false, password: false};
        if (user) {
          result.user = true;
          testPassword(user, result);
        }
        else{
          test(result);
        }
      });
      usr.findOne();
      function testPassword(usr, result) {
        bcrypt.compare(usrObj.password, usr.password, function(err, res) {
          result.password = res;
          test(result);
        });
      }
    },
    encrypt: function(cb){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(usrObj.password, salt, function(err, hash) {
         usrObj.password = hash;
            cb(usrObj);
          });
        });
      },
    makeToken: function(cb){
      var payload = {site: 'PGP'};
      var secret = usrObj.password;
      usrObj.atoken = jwt.encode(payload, secret);
      User.findOneAndUpdate({'email': usrObj.email},{atoken: usrObj.atoken}, function(err, resUser) {
        if (err) console.error(err);
        cb(resUser);
      });
    },
    getTokenInfo: function(cb, tk){
      console.log('authorize(54)');
      console.log(tk);
      var usr = User.where({atoken: tk});
      usr.findOne(function(err, resUser){
        if(err) console.log(err);
        console.log(resUser);

        cb(resUser);
      });
      usr.findOne();
    }
  }
};