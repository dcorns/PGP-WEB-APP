/**
 * Created by dcorns on 10/4/14.
 */
'use strict';

var User = require('../models/user'),
bcrypt = require('bcryptjs'),
jwt = require('jwt-simple'),
corngoose = require('../js/corngoose');


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
      corngoose.dbDocUpdate(payload, {atoken: usrObj.atoken}, 'users', function(err, stored){
        if(err){
          return cb(err, null);
        }
        if(stored){
          corngoose.dbDocFind({email: usrObj.email}, 'users', function(err, doc){
            if(err){
              return cb(err, null);
            }
            return cb(null, doc[0]);
          });
        }
      });
    },
    getTokenInfo: function (tk, cb) {
      corngoose.dbDocFind({atoken: tk}, 'users', function(err, doc){
        if(err){
          return cb(err, null);
        }
        return cb(null, doc[0]);
      });
    },
    authorizePgpEdit: function (user, pgpID, cb){
      corngoose.dbDocFind({_id: pgpID}, 'notes', function(err, cursor){
        if(err) return cb(err, null);
        var authorized = false;
        if(cursor[0].ta){
          if(cursor[0].ta === user.email || user.roll === 'admin'){
            authorized = true;
          }
        }
        else{
          authorized = true;
        }
        return cb(null, authorized);
      });
    },
    basicAuth: function(credentialsIn, cb){
      corngoose.dbDocFind({type:'authorization'}, 'protectedvar', function(err, doc){
        if(err){
          console.log('authorize 95 DataError: '+err.msg);
          return cb(err, false);
        }
        if(credentialsIn === doc[0].basicAuthVar){
          return cb(null, true);
        }
        else{
          return cb(null, false);
        }
      });
    }
  }
};