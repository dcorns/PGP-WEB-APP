/**
 * dgRouteProvider
 * Created by dcorns on 3/6/15.
 */
'use strict';

module.exports = function(rtObj){
  document.getElementById("dgView").innerHTML='<object type="text/html" data=' + rtObj.templateUrl + '></object>';
  rtObj.controller();
};