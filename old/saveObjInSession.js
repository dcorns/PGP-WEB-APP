/**
 * Created by dcorns on 11/9/14.
 */
'use strict';

module.exports = function(obj){
  return {
    saveNote: function(){
      for (var prop in obj) {
        if(obj.hasOwnProperty( prop )) {
          if(obj[prop]){
            if(Array.isArray(obj[prop])){
              for(var i = 0; i < obj[prop].length; i++){
                for(var subProp in obj[prop][i]){
                  if(obj[prop][i].hasOwnProperty(subProp)){
                    window.sessionStorage.setItem(prop+subProp+i, obj[prop][i][subProp]);
                  }
                }

                console.dir(obj[prop][i]);
              }
            }
            else{
              window.sessionStorage.setItem(prop, obj[prop]);
            }
          }
        }
      }
    }
  }
};