/**
 * previewPgpUi
 * Created by dcorns on 3/4/15.
 */
'use strict';
var ui = require('../js/ui');
module.exports = function(app){
  app.directive('previewPgpUi', function(){
    return {
      //script to run when directive called
      link: function(scope){
        var ux = ui();
        ux.setView('preview_PGP');
        console.dir(scope.$parent);
       // ux.setStudent();
      }
      ,scope: true
    }
  });
};