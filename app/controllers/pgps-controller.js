'use strict';
var ui = require('../js/ui');
var pgpResources = require('../js/pgpResources');
module.exports = function (app) {
  app.controller('pgpsController', function ($scope, $http) {
    var ux = ui();
    angular.element(document).ready(function () {
      ux.startHidden();
      ux.setToggles();
    });
    //Check for authorization before loading notes
    if (window.sessionStorage.getItem('token')) {
      var token = window.sessionStorage.getItem('token');
      $http.defaults.headers.common.Authorization = token;
      $scope.pgps = [];
      $scope.resources = [];
      $scope.getAllPgps = function () {
        $http({
          method: 'GET',
          url: '/api/v_0_0_1/pgps'
        }).success(function (data) {
          if (data) {
              $scope.pgps = data.n;
            if(window.sessionStorage.getItem('formIdx')){
              $scope.selectedPgp = $scope.pgps[window.sessionStorage.getItem('formIdx')];
            }
            else{
              $scope.selectedPgp = $scope.pgps[0];
              window.sessionStorage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
            }
          }
          document.getElementById("btnviewpgp").addEventListener('click', function(){
            window.sessionStorage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
          });
          document.getElementById("btncreatepgp").addEventListener('click', function(){
            window.sessionStorage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
          });
          document.getElementById('btnviewpgp').className = 'nav_ul-li';
          document.getElementById('btncreatepgp').className = 'nav_ul-li';
        }).error(function (data, status) {
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };
      $scope.getAllPgps();
      $scope.savePgp = function (pgp) {
        pgp.editing = null;
        $http.put('api/v_0_0_1/pgps/' + pgp._id, pgp)
          .success(function (data) {
            alert("PGP Saved");
          })
          .error(function (data) {
            console.log(data);
          });
      };
      $scope.deletePgp = function (pgp) {
        $http.delete('api/v_0_0_1/pgps/' + pgp._id, pgp)
          .success(function (data) {
            $scope.getAllPgps();
          })
          .error(function (data) {
            console.log(data);
          });
      };
      $scope.deleteAll = function () {
        $scope.pgps.forEach(function (pgp) {
          $scope.deletePgp(pgp)
        });
      };
      //add resource functions to scope
      $scope = pgpResources($scope, $http);
      $scope.getAllResources();
    }
  });
};
