'use strict';
var angular = require('angular');
var bannerController = require('./controllers/bannerController');
var pgpApp = angular.module('pgpApp', []);
pgpApp.controller('bannerController', ['$scope', bannerController]);