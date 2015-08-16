/**
 * drcSimple
 * Created by dcorns on 3/3/15.
 */
'use strict';
var ui = require('../ui');
module.exports = function(app){
  app.directive('drcSimple', function(){
    return {
      template: 'Name: {{selectedPgp.goal}} Address: {{selectedPgp.goala}}',
      //script to run when directive called
      link: function(){
        var ux = ui();
        ux.setView('create_PGP');
        }
    }
  });
};