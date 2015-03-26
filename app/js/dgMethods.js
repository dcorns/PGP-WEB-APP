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

dgMethod.ajaxPostJson = function(url, jsonData, cb, token){
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
if(token){
  ajaxReq.setRequestHeader('Authorization', token);
}
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxGet = function(url, cb, token){
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
  ajaxReq.open('GET', url, true);
  //ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send();
};

dgMethod.dataBindInput = function(elem, evnt, mdl, item){
  elem.addEventListener(evnt, function(){
    dgApp[mdl][item] = this.value;
  });
};

dgMethod.dataLoadSelect = function(elId, ary, item){
  var len = ary.length;
  var c = 0;
  var opt;
  for(c; c < len; c++){
    opt = document.createElement('option');
    opt.innerHTML = ary[c][item];
    opt.accessKey = c;
    document.getElementById(elId).appendChild(opt);
  }
};

module.exports = function (app){
  app.dgMethod = dgMethod;
};