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
      console.log('authorize(48)');
      console.log(usrObj.atoken);
      User.findOneAndUpdate({'email': usrObj.email},{atoken: usrObj.atoken}, function(err, resUser) {
        if (err) console.error(err);
        console.log(resUser);
        cb(resUser);
      });
    },
    getTokenInfo: function(cb, tk){
      console.log('authorize(54)');
      console.log('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoiUEdQIn0.nZEgKfoCmRlLgeng09nkJBm14U0Zk79RYG1WNYCMfQs');
      console.log(tk);
      var usr = User.where({atoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoiUEdQIn0.nZEgKfoCmRlLgeng09nkJBm14U0Zk79RYG1WNYCMfQs'});
      usr.findOne(function(err, resUser){
        if(err) console.log(err);
        console.log(resUser);

        cb(resUser);
      });
      usr.findOne();
    }
  }
};