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
        var btnViewPgp = document.getElementById('btnviewpgp'),
          btnCreatePgp = document.getElementById('btncreatepgp'),
          btnCreateAccount = document.getElementById('btncreateaccount');
        btnViewPgp.addEventListener('click', function(){
          storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
        });
        btnCreatePgp.addEventListener('click', function(){
          storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
        });
        btnViewPgp.className = 'nav_ul-li';
        btnCreatePgp.className = 'nav_ul-li';
        btnCreateAccount.className='hidden';
        }
    }
  });
};