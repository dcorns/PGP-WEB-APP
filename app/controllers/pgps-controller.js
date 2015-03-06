'use strict';
var pgpResources = require('../js/pgpResources');
module.exports = function (app) {
  app.controller('pgpsController', function ($scope, $http) {
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
            //The following added for backward compatibility; when the survey was only completed at the end
            $scope.showPostSurvey = $scope.pgps.preRtgComplete;
            var formIdx = storage.getItem('formIdx');
            if(formIdx){
              $scope.selectedPgp = $scope.pgps[formIdx];
            }
            else{
              $scope.selectedPgp = $scope.pgps[0];
              storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
            }
          }
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
            console.dir(data);
            alert(data);
          });
      };

      //add resource functions to scope
      $scope = pgpResources($scope, $http);
      $scope.getAllResources();

    }
  });
};
