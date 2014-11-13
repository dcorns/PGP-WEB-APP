'use strict';
var ui = require('../js/ui');
var pgpResources = require('../js/pgpResources');
module.exports = function (app) {
  app.controller('notesController', function ($scope, $http) {
    var ux = ui();
    angular.element(document).ready(function () {
      ux.startHidden();
      ux.setToggles();
    });
    //Check for authorization before loading notes
    if (window.sessionStorage.getItem('token')) {
      var token = window.sessionStorage.getItem('token');
      $http.defaults.headers.common.Authorization = token;
      $scope.notes = [];
      $scope.resources = [];
      $scope.getAllNotes = function () {
        $http({
          method: 'GET',
          url: '/api/v_0_0_1/notes'
        }).success(function (data) {
          if (data) {
              $scope.notes = data.n;
            if(window.sessionStorage.getItem('formIdx')){
              $scope.selectedNote = $scope.notes[window.sessionStorage.getItem('formIdx')];
            }
            else{
              $scope.selectedNote = $scope.notes[0];
              window.sessionStorage.setItem('formIdx', $scope.notes.indexOf($scope.selectedNote));
            }
          }
          document.getElementById("btnviewpgp").addEventListener('click', function(){
            window.sessionStorage.setItem('formIdx', $scope.notes.indexOf($scope.selectedNote));
          });
          document.getElementById("btncreatepgp").addEventListener('click', function(){
            window.sessionStorage.setItem('formIdx', $scope.notes.indexOf($scope.selectedNote));
          });
          document.getElementById('btnviewpgp').className = 'nav_ul-li';
          document.getElementById('btncreatepgp').className = 'nav_ul-li';
        }).error(function (data, status) {
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };
      $scope.getAllNotes();
      $scope.saveNote = function (note) {
        note.editing = null;
        $http.put('api/v_0_0_1/notes/' + note._id, note)
          .success(function (data) {
            alert("PGP Saved");
            // $scope.getAllNotes();
          })
          .error(function (data) {
            console.log(data);
          });
      };
      $scope.deleteNote = function (note) {
        $http.delete('api/v_0_0_1/notes/' + note._id, note)
          .success(function (data) {
            $scope.getAllNotes();
          })
          .error(function (data) {
            console.log(data);
          });
      };
      $scope.deleteAll = function () {
        $scope.notes.forEach(function (note) {
          $scope.deleteNote(note)
        });
      };
      //add resource functions to scope
      $scope = pgpResources($scope, $http);
      $scope.getAllResources();
    }
  });
};
