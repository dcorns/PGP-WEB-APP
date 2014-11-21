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
    var storage = window.sessionStorage;
    var token = storage.getItem('token');
    if (token) {
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
            var formIdx = storage.getItem('formIdx'),
              selectedPgp = $scope.selectedPgp,
              pgps = $scope.pgps,
              btnViewPgp = document.getElementById("btnviewpgp"),
              btnCreatePgp = document.getElementById("btncreatepgp");
            if(formIdx){
              selectedPgp = pgps[formIdx];
            }
            else{
              selectedPgp = pgps[0];
              storage.setItem('formIdx', pgps.indexOf(selectedPgp));
            }
          }
          btnViewPgp.addEventListener('click', function(){
            storage.setItem('formIdx', pgps.indexOf(selectedPgp));
          });
          btnCreatePgp.addEventListener('click', function(){
            storage.setItem('formIdx', pgps.indexOf(selectedPgp));
          });
          btnViewPgp.className = 'nav_ul-li';
          btnCreatePgp.className = 'nav_ul-li';
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
