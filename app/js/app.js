'use strict';
//comment for changes
require('angular/angular');
require('angular-route');

var pgpApp = angular.module('pgpApp', ['ngRoute']);

require('../controllers/pgps-controller')(pgpApp);
require('../controllers/user-controller')(pgpApp);
require('../controllers/survey-controller')(pgpApp);
require('../controllers/viewPGP-controller')(pgpApp);
require('../directives/drcOptCls-Directive')(pgpApp);
require('../directives/drcSimple')(pgpApp);

pgpApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/student_survey', {
      templateUrl: 'views/student_survey.html',
      controller: 'surveyController'
    })
    .when('/create_PGP', {
      templateUrl: 'views/create_PGP.html',
      controller: 'pgpsController'
    })
    .when('/preview_PGP', {
      templateUrl: 'views/preview_PGP.html',
      controller: 'pgpsController'
    })
    .when('/view_PGP', {
      templateUrl: 'views/view_PGP.html',
      controller: 'viewPGPController'
    })
    .when('/create_Account', {
      templateUrl: 'views/create_Account.html',
      controller: 'userController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'userController'
    })
    .otherwise({
      templateUrl: 'views/home.html',
      controller: 'userController'
    });
}]);
