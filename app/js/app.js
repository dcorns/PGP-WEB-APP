'use strict';
//comment for changes
require('angular/angular');
require('angular-route');

var notesApp = angular.module('notesApp', ['ngRoute']);

require('./notes/controllers/notes-controller')(notesApp);
require('./notes/controllers/ta-controller')(notesApp);
require('./notes/controllers/user-controller')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/student_survey', {
      templateUrl: 'views/notes/student_survey.html',
      controller: 'notesController'
    })
    .when('/create_PGP', {
      templateUrl: 'views/notes/create_PGP.html',
      controller: 'notesController'
    })
    .when('/view_PGP', {
      templateUrl: 'views/notes/view_PGP.html',
      controller: 'notesController'
    })
    .when('/create_Account', {
      templateUrl: 'views/notes/create_Account.html',
      controller: 'notesController'
    })
    .when('/login', {
      templateUrl: 'views/notes/login.html',
      controller: 'notesController'
    })
    .otherwise({
      //redirectTo: '/views/notes/home.html'
      templateUrl: 'views/notes/home.html',
      controller:'notesController'
    });
}]);
