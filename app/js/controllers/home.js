/**
 * home
 * Created by dcorns on 6/1/15.
 */
'use strict';
var views = require('../build/views');
var controllers = require('./controllerRegistry')();
var route = require('../router')(views, controllers);
module.exports = function(){
  document.getElementById('btncreatepgp').style.display = 'none';
  document.getElementById('btnsurvey').style.display = 'none';
  document.getElementById('btnviewpgp').style.display = 'none';

};