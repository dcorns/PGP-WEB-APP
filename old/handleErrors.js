/**
 * Created by dcorns on 11/14/14.
 */
'use strict';
module.exports = function(){
  return{
    alertObject: function(obj){
      var msg = '';
      for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
          msg = msg + obj[prop] + '\n';
        }
      }
      return alert(msg);
    }
  };
};