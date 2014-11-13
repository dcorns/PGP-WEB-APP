/**
 * Created by dcorns on 11/13/14.
 */
'use strict';
var validate = require('validator');
module.exports = function(){
  return{
    validateNewUser: function(user, res){
      var result = {err: null};
      if(!(validate.isEmail(user.email))) result.err = res.status(400).json({error:'Not a valid email address!'});
      if(!(validate.isLength(user.password, 6) )) result.err = res.status(400).json({error:'Password must be at least 6 characters long'});
      if(!(validate.isLength(user.lastName, 2))) result.err = res.status(400).json({error:'Last name must be at least 2 characters long'});
      if(!(validate.isLength(user.firstName, 2))) result.err = res.status(400).json({error:'First name must be at least 2 characters long'});
      return result;
    }
  }
};