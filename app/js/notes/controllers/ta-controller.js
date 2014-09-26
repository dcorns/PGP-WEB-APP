'use strict';

module.exports = function(app) {
  app.controller('taController', function($scope, $http) {
    $scope.getAllNotes = function() {
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/notes'
      }).success(function(data) {
        $scope.notes = data;
      }).error(function(data, status) {
        console.log('error!');
        console.log(data);
        console.log(status);
      });
    };

    $scope.getAllNotes();

    $scope.saveNewNote = function() {
      $http.post('api/v_0_0_1/notes', $scope.newNote)
        .success(function(data) {
          $scope.notes.push(data);
        })
        .error(function(data, status) {
          console.log(data);
        });
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
  });
};
