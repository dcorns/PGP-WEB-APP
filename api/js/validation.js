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
    },
    validateSurvey: function (obj, cb){
      var valid = true;
      var err = null;
      if(((!(obj.rtg1 > 0)) || (!(obj.rtg1 < 6))) && (!(typeof obj.rtg1 === 'undefined'))){
        valid = false;
        err = addValErr(err, "HTML-Assessment", "Select from 1-5 only for HTML rating");
      }
      if(((!(obj.rtg2 > 0)) || (!(obj.rtg2 < 6))) && (!(typeof obj.rtg2 === 'undefined'))){
        valid = false;
        err = addValErr(err, "CSS-Assessment", "Select from 1-5 only for CSS rating");
      }if(((!(obj.rtg3 > 0)) || (!(obj.rtg3 < 6))) && (!(typeof obj.rtg3 === 'undefined'))){
        valid = false;
        err = addValErr(err, "JS-Assessment", "Select from 1-5 only for JavaScript rating");
      }if(((!(obj.rtg4 > 0)) || (!(obj.rtg4 < 6))) && (!(typeof obj.rtg4 === 'undefined'))){
        valid = false;
        err = addValErr(err, "GIT-Assessment", "Select from 1-5 only for GIT rating");
      }if(((!(obj.rtg5 > 0)) || (!(obj.rtg5 < 6))) && (!(typeof obj.rtg5 === 'undefined'))){
        valid = false;
        err = addValErr(err, "DSA-Assessment", "Select from 1-5 only for DataStructures and Algorithms rating");
      }if(((!(obj.rtg6 > 0)) || (!(obj.rtg6 < 6))) && (!(typeof obj.rtg6 === 'undefined'))){
        valid = false;
        err = addValErr(err, "CMD-Assessment", "Select from 1-5 only for Command Line rating");
      }if(((!(obj.rtg7 > 0)) || (!(obj.rtg7 < 6))) && (!(typeof obj.rtg7 === 'undefined'))){
        valid = false;
        err = addValErr(err, "OOP-Assessment", "Select from 1-5 only for Object-Orientated programming rating");
      }
      cb(err,valid);
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
  function addValErr(err, errName, errMsg){
    if(!(err)){
      err = {};
    }
    if(!(errName[errName])){
      err[errName] = errMsg;
    }
    return err;
  }
};