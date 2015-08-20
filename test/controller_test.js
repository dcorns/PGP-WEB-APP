/**
 * controller_test.js
 * Created by dcorns on 8/18/15.
 */
'use strict';
require('../app/js/app');
require('angular-mocks');

describe('Controller Testing', function(){
  beforeEach(angular.mock.module('pgpApp'));
  var $controller, $scope;

  describe('homeController', function(){
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
      $scope = {};
      $controller('homeController', {$scope: $scope});
    }));
    describe('homeController $scope.heading', function(){
      it('should have a value equal Personal Growth Plan', function(){
        expect($scope.heading).toEqual('Personal Growth Plan');
      });
      it('should be able to have its value changed', function(){
        $scope.heading = 'Code Fellows';
        expect($scope.heading).toEqual('Code Fellows');
      });
    });
  });
  describe('loginController', function(){
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
      $scope = {};
      $controller('loginController', {$scope: $scope});
    }));
    describe('loginController $scope.heading', function(){
      it('should have a value equal Login Screen', function(){
        expect($scope.heading).toEqual('Login Screen');
      });
      it('should be able to have its value changed', function(){
        $scope.heading = 'Code Fellows';
        expect($scope.heading).toEqual('Code Fellows');
      });
    });
  });

  describe('resourceController', function(){
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
      $scope = {};
      $controller('resourcesController', {$scope: $scope});
    }));
    describe('resourcesController $scope.heading', function(){
      it('should have a value equal Login Screen', function(){
        expect($scope.heading).toEqual('Resource Maintenance');
      });
      it('should be able to have its value changed', function(){
        $scope.heading = 'Code Fellows';
        expect($scope.heading).toEqual('Code Fellows');
      });
    });
  });

  describe('signupController', function(){
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
      $scope = {};
      $controller('signupController', {$scope: $scope});
    }));
    describe('resourcesController $scope.heading', function(){
      it('should have a value equal Login Screen', function(){
        expect($scope.heading).toEqual('Create An Account');
      });
      it('should be able to have its value changed', function(){
        $scope.heading = 'Code Fellows';
        expect($scope.heading).toEqual('Code Fellows');
      });
    });
  });

});