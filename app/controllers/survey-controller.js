/**
 * Created by dcorns on 11/8/14.
 */
'use strict';
module.exports = function (app){
  app.controller('surveyController', function ($http, $scope){
    var ui = require('../js/ui');
    var ux = ui();
    angular.element(document).ready(function () {
      ux.startHidden();
      ux.setToggles();
    });
    var storage = window.sessionStorage;
    var token = storage.getItem('token');
    if(token){
      $http.defaults.headers.common.Authorization = token;
      $scope.getUserForm = function(){
        $http({
          method: 'GET',
          url: 'api/v_0_0_1/userForm'
        }).success(function(data){
          $scope.survey = data;
          $scope.showPostSurvey = $scope.survey.preRtgComplete;
          //For some reason these do not bind like the rest so this temp work around
          ux.fillInput("rtg1", $scope.survey.rtg1);
          ux.fillInput("rtg2", $scope.survey.rtg2);
          ux.fillInput("rtg3", $scope.survey.rtg3);
          ux.fillInput("rtg4", $scope.survey.rtg4);
          ux.fillInput("rtg5", $scope.survey.rtg5);
          ux.fillInput("rtg6", $scope.survey.rtg6);
          ux.fillInput("rtg7", $scope.survey.rtg7);
        }).error(function(data, status){
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };
      $scope.getUserForm();

      $scope.saveSurvey = function () {
        $http.post('api/v_0_0_1/userForm', $scope.survey)
          .success(function (data) {
            $scope.survey = data;
            alert("Your self-assessment progress has been saved. Thank you!");
            window.location = "/#/home";
          })
          .error(function (data, status) {
            console.log(status);
            alert("There was a problem submitting your assessment, Make sure all your input is valid.");
          });
      };
    }

  });
};