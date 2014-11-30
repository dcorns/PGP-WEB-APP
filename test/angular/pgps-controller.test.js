/**
 * Created by dcorns on 11/28/14.
 */
'use strict';
var ui = require('../../app/js/ui');
var pgpResources = require('../../app/js/pgpResources');
describe('main', function(){
  var scope;
beforeEach(angular.mock.module('pgpApp'));
  beforeEach(angular.mock.inject(function($rootScope, $pgpsController){
    scope = $rootScope.$new();
    $pgpsController('main', {$scope: scope});
  }));
  //Test begin
it('Should have array pgps', function(){
  expect(isArray(scope.pgps)).toBe(true);
});
});