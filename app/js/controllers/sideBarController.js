/**
 * sideBarController
 * Created by dcorns on 8/17/15.
 * This controller is for changing side bar navigation based on route that is called
 */
'use strict';
module.exports = function($scope, $rootScope, $location){
  var ctrl = 'homeController';
$rootScope.$on('$routeChangeStart', function(evt, next){
  ctrl = next.$$route.controller;
  switch(ctrl){
    case 'homeController':
      $scope.listItems = [
        {
          name:'Welcome',
          route: '#home'
        },
        {
          name:'Resources',
          route: '#resources'
        }
      ];
      break;
    case 'resourcesController':
      $scope.listItems = [
        {
          name:'Welcome',
          route: '#home'
        }
      ];
      break;
    case 'loginController':
      $scope.listItems = [
        {
          name:'Welcome',
          route: '#home'
        }
      ];
      break;
    default:
      $scope.listItems = [];
  }
});


};