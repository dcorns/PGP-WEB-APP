/**
 * Created by dcorns on 11/11/14.
 */
'use strict';
var LFS = require('../js/loadObjFromSession');
module.exports = function (app){
  app.controller('viewPGPController', function ($http, $scope){
    var ui = require('../js/ui');
    var ux = ui();
    angular.element(document).ready(function () {
      ux.startHidden();
      ux.setToggles();
    });
    if(window.sessionStorage.getItem('token')){
      var token = window.sessionStorage.getItem('token');
      $http.defaults.headers.common.Authorization = token;

      $scope.getUserForm = function(){
        $http({
          method: 'GET',
          url: 'api/v_0_0_1/userForm'
        }).success(function(data){
          $scope.pgp = data;
          //For some reason these do not bind like the rest so this temp work around
          ux.fillInput("rtg1", $scope.pgp.rtg1);
          ux.fillInput("rtg2", $scope.pgp.rtg2);
          ux.fillInput("rtg3", $scope.pgp.rtg3);
          ux.fillInput("rtg4", $scope.pgp.rtg4);
          ux.fillInput("rtg5", $scope.pgp.rtg5);
          ux.fillInput("rtg6", $scope.pgp.rtg6);
          ux.fillInput("rtg7", $scope.pgp.rtg7);
        }).error(function(data, status){
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };
      $scope.getUserForm();
    }

  });
};