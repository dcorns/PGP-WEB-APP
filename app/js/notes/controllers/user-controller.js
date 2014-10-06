/**
 * Created by dcorns on 10/2/14.
 */
'use strict';
module.exports = function(app) {
  app.controller('userController', function($scope, $http) {

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

    $scope.getAllUsers();

    $scope.saveNewUser = function() {
      $http.post('api/v_0_0_1/users', $scope.newUser)
        .success(function(data) {
          $scope.users.push(data);
          alert("Account created.");
        })
        .error(function(data, status) {
          console.error(data + ',' + status);
          alert("There was a problem creating your account");
        });

    };

    $scope.userLogin = function() {
      $http.post('api/v_0_0_1/login', $scope.loginUser)
        .success(function(data) {
          console.log('user-controller(39)');
          console.log('success: '+ data);
          //Save token in local storage
          window.sessionStorage.setItem('token', data);
                    //location.path('/');
//                    if (window.sessionStorage.getItem('token')) {
//                        config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token');
//                      }
                    console.dir(window.sessionStorage.getItem('token'));
          //window.sessionStorage.removeItem('token');
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