/**
 * Created by dcorns on 10/12/14.
 */
'use strict';

var User = require('../../models/user');
var Notes = require('../../models/note');

module.exports = function(obj){
  return{
    combineUsers: function(cb){
      var badNews = null;
      User.find({}, function(err, users){
        if (err) cb(err, null);
        else {
          //obj.users = users;
          for(var i = 0; i < obj.length; i++){
            for(var ii = 0; ii < users.length; ii++){
              if(obj[i].student === users[ii].email){
                obj[i].name = users[ii].firstName + ' ' + users[ii].lastName;
                console.log('db(21)');
                console.log(obj[i].name);
                //return;
              }
            }
          }
          console.log('db(15)');
          // console.log(obj);
          // console.log(users);
          //console.log(obj);
          cb(null, obj);
        }
      });
    }
  }
};