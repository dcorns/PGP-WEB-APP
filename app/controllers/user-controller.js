/**
 * Created by dcorns on 10/2/14.
 */
'use strict';
var ui = require('../js/ui');
var SOS = require('../js/saveObjInSession');
var handleErrors = require('../js/handleErrors');
module.exports = function(app) {
  app.controller('userController', function($scope, $http) {
    var ux = ui();
    ux.hideMainButtons();

    $scope.getAllUsers = function() {
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/users'
      }).success(function(data) {
        $scope.users = data;
        $scope.selectedUser = $scope.users[0];
      }).error(function(data, status) {
        console.log('error!');
        console.log(status);
      });
    };

    $scope.saveNewUser = function() {
      $http.post('api/v_0_0_1/users', $scope.newUser)
        .success(function(data) {
          alert("Welcome! Your account was created. Please sign in to complete your survey.");
          window.location="/#/login";
        })
        .error(function(data) {
          var handleError = handleErrors();
          handleError.alertObject(data);
        });

    };

    $scope.userLogin = function() {
      window.sessionStorage.removeItem('token');
      $http.post('api/v_0_0_1/login', $scope.loginUser)
        .success(function(data) {
          console.log('uc47');
          console.dir(data);
          //Save token in local storage
          window.sessionStorage.setItem('token', data.usr.atoken);
          var ca = document.getElementById('btncreateaccount');
          ca.className = 'hidden';

          if(data.usr.roll === 'ta'){
            document.getElementById('btnsurvey').className = 'hidden';
            document.getElementById('btncreatepgp').className = 'nav_ul-li';
            document.getElementById('btnviewpgp').className = 'nav_ul-li';
            window.location="/#/create_PGP";
          }
          else{
            if(data.usr.roll === 'student'){
              document.getElementById('btncreatepgp').className = 'hidden';
              document.getElementById('btnsurvey').className = 'nav_ul-li';
              //Save note to local storage
              var sessionNote = SOS(data.note);
              sessionNote.saveNote();
              if(data.note.recComplete) window.location='/#/view_PGP';
              else window.location='/#/student_survey';
            }
          }

        })

        .error(function(data, status) {
          console.log("error");
          console.dir(status);
          alert("There was a problem signing in");
        });
      //alert("This should always occur");
    };


    $scope.editUser = function(user) {
      user.editing = true;
    };

    $scope.saveUser = function(user) {
      user.editing = null;
      $http.put('api/v_0_0_1/users/' + user._id, user)
        .success(function(data) {
          $scope.getAllUsers();
        })
        .error(function(data) {
          console.log(data);
        });
    };

    $scope.deleteUser = function(user) {
      $http.delete('api/v_0_0_1/users/' + user._id, user)
        .success(function(data) {
          $scope.getAllUsers();
        })
        .error(function(data) {
          console.log(data);
        });
    };

    $scope.deleteAll = function() {
      $scope.users.forEach(function(user) {$scope.deleteUser(user)});
    }
  });
};
