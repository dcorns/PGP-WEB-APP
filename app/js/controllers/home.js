/**
 * home
 * Created by dcorns on 6/1/15.
 */
'use strict';
var views = require('../build/views');
var controllers = require('./controllerRegistry')();
var route = require('../router')(views, controllers);
module.exports = function(){
  document.getElementById('mybtn').addEventListener('click', function(e){
    alert('you clicked me!');
  });
};