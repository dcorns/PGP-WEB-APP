/**
 * Created by dcorns on 12/18/14.
 */
'use strict';

module.exports = function(app){
  app.directive('drcOptClsDirective', function($parse){
    console.log('directive called');
    return {
      require: 'select',
      link: function($scope, elem, attrs, ngSelect){
        console.log('link called');
        console.dir(attrs.ngOptions);
        var optionsSourceStr = attrs.ngOptions.split(' ').pop()
          , getOptionsClass = $parse(attrs.optionsClass);
        console.dir(optionsSourceStr);
        $scope.$watch(optionsSourceStr, function(items){
          console.log('watch triggered'); console.dir(items);
          angular.forEach(items, function (item, index){
            var classes = getOptionsClass(item)
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