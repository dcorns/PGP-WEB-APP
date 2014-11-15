/**
 * Created by dcorns on 11/13/14.
 */
'use strict';
var validate = require('validator');
module.exports = function(){
  return{
    validateNewUser: function(user, cb){
      var valid = true;
      var failed = {};
      if(!(validate.isEmail(user.email))){
        failed.email = 'Not a valid email address!';
        valid = false;
      }
      if(!(validate.isLength(user.password, 6) )){
        failed.passwordLength = 'Password must be at least 6 characters long';
        valid = false;
      }
      if(!(validate.isLength(user.lastName, 2))){
        failed.lastNameLength = 'Last name must be at least 2 characters long';
        valid = false;
      }
      if(!(validate.isLength(user.firstName, 2))){
        failed.firstNameLength = 'First name must be at least 2 characters long';
        valid = false;
      }
      return cb(valid, failed);
    }
  }
};