/**
 * Created by dcorns on 10/7/14.
 */
'use strict';
module.exports = function(){
  return {
    fillInput: function(id, val){
      if (document.getElementById(id)) {
        console.log(id+','+val);
        document.getElementById(id).value = val || "";
        return this;
      }
    }
  }
};
