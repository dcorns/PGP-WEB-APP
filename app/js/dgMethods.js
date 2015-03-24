/**
 * dgMethods
 * Created by dcorns on 3/16/15.
 * Common methods for dgApp
 */
'use strict';
var dgMethod = {};
//Method for setting scripts to run after the window loads
dgMethod.winReady = function(f){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = f;
  }
  else{
    window.onload = function() {
      preOnload();
      f();
    }
  }
};

dgMethod.ajaxPostJson = function(url, jsonData, cb){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.dataBindInput = function(elem, evnt, mdl, item){
  elem.addEventListener(evnt, function(){
    dgApp[mdl][item] = this.value;
  });
};

module.exports = function (app){
  app.dgMethod = dgMethod;
};