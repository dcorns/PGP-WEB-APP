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

switch(dgRoute) {
  case '/student_survey':
    return {
      templateUrl: 'views/student_survey.html',
      controller: 'surveyController'
    };
    break;
  case '/create_PGP':
    return {
      templateUrl: 'views/create_PGP.html',
      controller: 'pgpsController'
    };
    break;
  case '/preview_PGP':
    return {
      templateUrl: 'views/preview_PGP.html',
      controller: 'pgpsController'
    };
    break;
  case '/view_PGP':
    return {
      templateUrl: 'views/view_PGP.html',
      controller: 'viewPGPController'
    };
    break;
  case '/create_Account':
    return {
      templateUrl: 'views/create_Account.html',
      controller: 'userController'
    };
    break;
  case '/login':
    return {
      templateUrl: 'views/login.html',
      controller: 'userController'
    };
    break;
  default:
    return {
      templateUrl: 'views/home.html',
      controller: 'userController'
    };
    break;
}
