'use strict';
angular = require('angular');
var bannerController = require('./controllers/bannerController');
var homeController = require('./controllers/homeController');
var sideBarController = require('./controllers/sideBarController');
var resourcesController = require('./controllers/resourcesController');
var loginController = require('./controllers/loginController');
var signupController = require('./controllers/signupController');
var ngRoute = require('angular-route');

var pgpApp = angular.module('pgpApp', ['ngRoute']);
pgpApp.controller('homeController', ['$scope', homeController]);
pgpApp.controller('bannerController', ['$rootScope', '$scope', bannerController]);
pgpApp.controller('sideBarController', ['$rootScope', '$scope', sideBarController]);
pgpApp.controller('resourcesController', ['$scope', resourcesController]);
pgpApp.controller('loginController', ['$scope', loginController]);
pgpApp.controller('signupController', ['$scope', signupController]);

require('./routes')(pgpApp);
