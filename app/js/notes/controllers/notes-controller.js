'use strict';

module.exports = function(app) {
  app.controller('notesController', function($scope, $http) {
    var ui = require('../../ui');
    //Check for authorization before loading notes
    console.log('notes-controller(7)'+sessionStorage.getItem('token'));
    if(window.sessionStorage.getItem('token')){
    var token = window.sessionStorage.getItem('token');
    console.log('notes-controller(10)');
    console.log(token);
    $http.defaults.headers.common.Authorization = token;


    $scope.getAllNotes = function() {
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/notes'
      }).success(function(data) {
        $scope.notes = data;
        console.log('notes-controller(21)');
        console.dir($scope.notes);
        $scope.selectedNote = $scope.notes[0];
        console.dir($scope.selectedNote);
       // ui.fillInput("course", $scope.notes[0].course);
      }).error(function(data, status) {
        console.log('error!');
        console.log(status);
      });
    };

    $scope.getAllNotes();

    $scope.saveNewNote = function() {
      $http.post('api/v_0_0_1/notes', $scope.newNote)
        .success(function(data) {
          console.log('notes-controller(37)');
          console.log(data);
          console.log($scope.notes);
          $scope.notes.push(data);
          console.log($scope.notes);
        })
        .error(function(data, status) {
          console.log(data);
        });
      alert("Your self-assessment has been submitted. Thank you!");
    };

    $scope.editNote = function(note) {
      note.editing = true;
    };

    $scope.saveNote = function(note) {
      note.editing = null;
      $http.put('api/v_0_0_1/notes/' + note._id, note)
        .success(function(data) {
          $scope.getAllNotes();
        })
        .error(function(data) {
          console.log(data);
        });
    };

    $scope.deleteNote = function(note) {
      $http.delete('api/v_0_0_1/notes/' + note._id, note)
        .success(function(data) {
          $scope.getAllNotes();
        })
        .error(function(data) {
          console.log(data);
        });
    };

    $scope.deleteAll = function() {
      $scope.notes.forEach(function(note) {$scope.deleteNote(note)});
    }
    }
  });
};
