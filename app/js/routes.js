/**
 * routes.js
 * Created by dcorns on 8/17/15.
 */
'use strict';


module.exports = function(app){

  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: '../views/home.html',
        controller: 'homeController'
      })
      .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'homeController'
      })
      .when('/resources', {
        templateUrl: '../views/resources.html',
        controller: 'resourcesController'
      })
      .when('/login', {
        templateUrl: '../views/login.html',
        controller: 'loginController'
      })
      .when('/signup', {
        templateUrl: '../views/signup.html',
        controller: 'signupController'
      })
      .otherwise({
        templateUrl: '..views/home.html',
        controller: 'homeController'
      });
  }]);
};