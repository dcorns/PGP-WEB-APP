/**
 * sideBarController
 * Created by dcorns on 8/17/15.
 * This controller is for changing side bar navigation based on route that is called
 */
'use strict';
module.exports = function($scope, $rootScope){
  require('../sidebarMenu')($scope, $rootScope);
};