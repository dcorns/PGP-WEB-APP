/**
 * sidebarMenu
 * Created by dcorns on 8/18/15.
 */
'use strict';

module.exports = function($scope, $rootScope){
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