/**
 * drcSimple
 * Created by dcorns on 3/3/15.
 */
'use strict';
var ui = require('../js/ui');
module.exports = function(app){
  app.directive('drcSimple', function(){
    return {
      template: 'Name: {{selectedPgp.goal}} Address: {{selectedPgp.goala}}',
      link: function(){

        }
    }
  });
};