/**
 * Created by dcorns on 12/18/14.
 */
'use strict';

module.exports = function(app){
  app.directive('drcOptClsDirective', function($parse){
    console.log('directive called');
    return {
      template: '<select data-ng-model=\"selectedPgp\" data-ng-options=\"pgp.name for pgp in pgps\" ></select>',
      link: function($scope, elem, attrs){
        $scope.$watch($scope.pgps, function(){
          console.log('watch triggered'); console.dir($scope.pgps);
          angular.forEach($scope.pgps, function (pgp, index){
            var classes = getOptionsClass(pgp)
              , option = elem.find('option[value=' + index + ']');
            angular.forEach(classes, function(add, className){
              if(add){
                angular.element(option).addClass(className);
              }
            })
          })
        })
      }
    };
  });

};