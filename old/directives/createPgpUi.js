/**
 * createPgPUi
 * Created by dcorns on 3/4/15.
 */
'use strict';
var ui = require('../ui');
module.exports = function(app){
  app.directive('createPgpUi', function(){
    return {
      //scope: true
      //script to run when directive called
      link: function(scope){
        var ux = ui();
        ux.setView('create_PGP');
        ux.startHidden();
        ux.setToggles();
        //ux.setStudent();
        console.dir(scope.$parent.pgps);
      }
    }
  });
};