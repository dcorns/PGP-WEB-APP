'use strict';
angular = require('angular');
var bannerController = require('./controllers/bannerController');
var homeController = require('./controllers/homeController');
var sideBarController = require('./controllers/sideBarController');
var resourcesController = require('./controllers/resourcesController');
var loginController = require('./controllers/loginController');
var ngRoute = require('angular-route');

var pgpApp = angular.module('pgpApp', ['ngRoute']);
pgpApp.controller('homeController', ['$scope', homeController]);
pgpApp.controller('bannerController', ['$rootScope', '$scope', bannerController]);
pgpApp.controller('sideBarController', ['$rootScope', '$scope', sideBarController]);
pgpApp.controller('resourcesController', ['$scope', resourcesController]);
pgpApp.controller('loginController', ['$scope', loginController]);

pgpApp.config(['$routeProvider', function($routeProvider){
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
    .otherwise({
      templateUrl: '..views/home.html',
      controller: 'homeController'
    });
}]);