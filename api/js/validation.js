/**
 * Created by dcorns on 11/13/14.
 */
'use strict';
var validate = require('validator');
module.exports = function(){
  return{
    validateNewUser: function(user, cb){
      var result = Object.create(null);
      if(!(validate.isEmail(user.email))) result.email = 'Not a valid email address!';
      if(!(validate.isLength(user.password, 6) )) result.passwordLength = 'Password must be at least 6 characters long';
      if(!(validate.isLength(user.lastName, 2))) result.lastNameLength = 'Last name must be at least 2 characters long';
      if(!(validate.isLength(user.firstName, 2))) result.firstNameLength = 'First name must be at least 2 characters long';
      return cb(result);
    }
  }
};