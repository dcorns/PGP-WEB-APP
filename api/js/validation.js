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
      if(validateEmail(user.email)){
        failed.email = 'Not a valid email address!';
        valid = false;
      }
      if(validatePassword(user.password)){
        failed.passwordLength = 'Password must be at least 6 characters long';
        valid = false;
      }
      if(validateName(user.lastName)){
        failed.lastNameLength = 'Last name must be at least 2 characters long';
        valid = false;
      }
      if(validateName(user.firstName)){
        failed.firstNameLength = 'First name must be at least 2 characters long';
        valid = false;
      }
      return cb(valid, failed);
    },
    validateLogin: function(user, cb){
      var valid = true;
      var failed = {};
      if(validateEmail(user.email)){
        failed.email = 'Not a valid email address!';
        valid = false;
      }
      if(validatePassword(user.password)){
        failed.passwordLength = 'There is a problem with your password';
        valid = false;
      }
      return cb(valid, failed);
    }
  };
  function validateEmail(txt){
    return (!(validate.isEmail(txt)));
  }
  function validatePassword(txt){
    return (!(validate.isLength(txt, 6)));
  }
  function validateName(txt){
    return (!(validate.isLength(txt, 2)));
  }
};