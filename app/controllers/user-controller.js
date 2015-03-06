/**
 * Created by dcorns on 10/2/14.
 */
'use strict';
var SOS = require('../js/saveObjInSession');
var handleErrors = require('../js/handleErrors');
module.exports = function(app) {
  app.controller('userController', function($scope, $http) {
    $scope.saveNewUser = function() {
      $http.post('api/v_0_0_1/users', $scope.newUser)
        .success(function(data) {
          alert("Welcome! Your account was created. Please sign in to complete your survey.");
          window.location="/#/login";
        })
        .error(function(data) {
          alert(data);
        });
    };

    $scope.userLogin = function() {
      var storage = window.sessionStorage;
      storage.removeItem('token');
      $http.post('api/v_0_0_1/login', $scope.loginUser)
        .success(function(data) {
          //Save token in local storage
          storage.setItem('token', data.user.atoken);
          var roll = data.user.roll
          if(roll === 'ta' || roll === 'admin'){
            window.location="/#/create_PGP";
          }
          else{
            if(roll === 'student'){
              //Save note to local storage
              var sessionNote = SOS(data.note);
              sessionNote.saveNote();
              if(data.note.recComplete) window.location='/#/view_PGP';
              else window.location='/#/student_survey';
            }
          }
        })
        .error(function(data) {
          var handleError = handleErrors();
          handleError.alertObject(data);
        });
    };
  });
};
