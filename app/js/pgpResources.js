/**
 * Created by dcorns on 11/12/14.
 */
'use strict';
var ui = require('../js/ui');
module.exports = function($scope, $http){
  var ux = ui();
  $scope.removeResource = function (e, item, rsrc, rsrcFor) {
    var obj = {resourceFor: rsrcFor, resource: item};
    if(e.altKey){
      $http.put('api/v_0_0_1/resources/', obj)
        .success(function (data) {
          alert(data.title +' deleted!');
          $scope.getAllResources();
        })
        .error(function (data) {
          console.dir(data);
          alert(data.error);
        });
    }
  };
  $scope.saveResource = function (nrsrc, rsrc, rsrcFor, inputClass) {
    nrsrc.resourceFor = rsrcFor;
    $http.post('api/v_0_0_1/resources/', nrsrc)
      .success(function (data) {
        ux.blankInput(inputClass);
        if (typeof rsrc !== 'undefined') {
          rsrc.push(data);
        }
        else {
          rsrc = [data];
        }
        alert("New " + rsrcFor + " Resource Saved!");
      })
      .error(function (data) {
        console.dir(data);
        alert("Error saving resource!");
      });
  };
  $scope.getAllResources = function () {
    $http({
      method: 'GET',
      url: '/api/v_0_0_1/resources/'
    }).success(function (data) {
      console.log('nc131');
      console.dir(data);
      $scope.resources = data;
      for (var i = 0; i < data.length; i++) {
        console.log(i + ', ' + data[i].resourceFor);
        data[i].resource.sort(function(a, b){
          if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
          return 0;
        });
        switch (data[i].resourceFor) {
          case 'General':
            $scope.genResources = data[i].resource;
            $scope.selectedG1Res = $scope.genResources[0];
            $scope.selectedG2Res = $scope.genResources[0];
            $scope.selectedG3Res = $scope.genResources[0];
            $scope.selectedG4Res = $scope.genResources[0];
            $scope.selectedG5Res = $scope.genResources[0];
            break;
          case 'HTML':
            $scope.HTMLResources = data[i].resource;
            $scope.selectedHTMLRes = $scope.HTMLResources[0];
            break;
          case 'CSS':
            $scope.CSSResources = data[i].resource;
            $scope.selectedCSSRes = $scope.CSSResources[0];
            break;
          case 'JS':
            $scope.JSResources = data[i].resource;
            $scope.selectedJSRes = $scope.JSResources[0];
            break;
          case 'GIT':
            $scope.GITResources = data[i].resource;
            $scope.selectedGITRes = $scope.GITResources[0];
            break;
          case 'DSA':
            $scope.DSAResources = data[i].resource;
            $scope.selectedDSARes = $scope.DSAResources[0];
            break;
          case 'CMD':
            $scope.CMDResources = data[i].resource;
            $scope.selectedCMDRes = $scope.CMDResources[0];
            break;
          case 'OOP':
            $scope.OOPResources = data[i].resource;
            $scope.selectedOOPRes = $scope.OOPResources[0];
            break;
          default:
            break;
        }
      }

    }).error(function (data, status) {
      console.dir(data);
      console.log('error!');
      console.log(status);
    });
  };
  $scope.addResource = function (sel, rsrc) {
    console.log('Add Resource');
    rsrc.push(sel);
  };
  $scope.removeRsrcFromPGP = function (e, item, rsrc) {
    console.dir(e); console.dir(item); console.dir(rsrc);
    if (e.altKey) {
      var idx = rsrc.indexOf(item);
      rsrc.splice(idx, 1);
    }
  };

  return $scope;
};