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
      var usr = User.where({email: usrObj.email.toLowerCase()});
      console.log('authorize(17)');
      console.dir(usrObj);
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
        console.log('authorize(32)');
        console.dir(usr);
        console.dir(usrObj);
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
      var payload = {email: usrObj.email};
      console.log('authorize(51)');
      console.dir(usrObj);
      var secret = usrObj.password;
      usrObj.atoken = jwt.encode(payload, secret);
      console.log('authorize(55)');
      console.log(usrObj.atoken);
      User.findOneAndUpdate({'email': usrObj.email},{atoken: usrObj.atoken}, function(err, resUser) {
        if (err) console.error(err);
        console.log(resUser);
        cb(resUser);
      });
    },
    getTokenInfo: function(cb, tk){
      console.log('authorize(59)');
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