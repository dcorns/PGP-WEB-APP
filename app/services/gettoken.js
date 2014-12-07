'use strict';
var ui = require('../js/ui')();
var pgpResources = require('../js/pgpResources');
module.exports = function(app){
  app.service('tokenService', function(){
    this.token = function(){
      return window.sessionStorage.getItem('token');
    }();
    this.ui = ui;
    this.pgpResources = pgpResources;
  });
};
