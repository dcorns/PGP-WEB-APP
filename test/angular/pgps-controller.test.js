/**
 * Created by dcorns on 11/28/14.
 */
'use strict';
require('../../app/js/app');
require('angular-mocks');

describe('pgps-controller', function(){
  var $controllerConstructor
    ,$httpBackend
    ,$scope
    ,pgpsController;
  beforeEach(angular.mock.module('pgpApp'));
 // beforeEach(angular.mock.module('angular'));
  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
    pgpsController = $controllerConstructor('pgpsController', {$scope: $scope});
  }));
  //Test begin
  it('app.js should be able to create a controller', function() {
    expect(typeof pgpsController).toBe('object');
  });
  describe('scope functions and vars', function(){
    it('has the arrays $scope.pgps and $scope.resources', function(){
      expect(Array.isArray($scope.pgps)).toBeTruthy();
      expect(Array.isArray($scope.resources)).toBeTruthy();
      expect($scope.token).toBeNull();

    });
  });

});