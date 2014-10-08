/**
 * Created by dcorns on 10/7/14.
 */
'use strict';
module.exports = function(){
  return{
    fillInput: function(id, val){
        console.log(id+','+val);
        document.getElementById(id).value = val || "";
        return this;
      }
    }
};