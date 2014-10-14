'use strict';

module.exports = function(app) {
  app.controller('notesController', function($scope, $http) {
    var ui = require('../../ui');
    //hide buttons before authorization
    document.getElementById('btncreatepgp').className = 'hidden';
    document.getElementById('btnsurvey').className = 'hidden';
    document.getElementById('btnviewpgp').className = 'hidden';

    //Check for authorization before loading notes
    if(window.sessionStorage.getItem('token')){
    var token = window.sessionStorage.getItem('token');
    $http.defaults.headers.common.Authorization = token;

    $scope.notes = [];
    $scope.resources = [];
    $scope.getAllNotes = function() {
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/notes'
      }).success(function(data) {
        console.dir(data);
        if(data) {
          if(Array.isArray(data)){
            $scope.notes = data;
          }
          else {
            $scope.notes = [data];
          }
          $scope.selectedNote = $scope.notes[0];

          //load input fields with existing data
          $scope.hidetest = true;
          var ux = ui();
          ux.fillInput("course", $scope.selectedNote.course);
          ux.fillInput("rtg1", $scope.selectedNote.rtg1);
          ux.fillInput("rtg2", $scope.selectedNote.rtg2);
          ux.fillInput("rtg3", $scope.selectedNote.rtg3);
          ux.fillInput("goal", $scope.selectedNote.goal);
          ux.fillInput("note", $scope.selectedNote.note);
          ux.fillInput("course", $scope.selectedNote.course);
          ux.fillInput("rtg4", $scope.selectedNote.rtg4);
          ux.fillInput("rtg5", $scope.selectedNote.rtg5);
          ux.fillInput("rtg6", $scope.selectedNote.rtg6);
          ux.fillInput("rtg7", $scope.selectedNote.rtg7);
          ux.fillInput("goal", $scope.selectedNote.goal);
          ux.fillInput("goal2", $scope.selectedNote.goal2);
          ux.fillInput("goal3", $scope.selectedNote.goal3);
          ux.fillInput("goal4", $scope.selectedNote.goal4);
          ux.fillInput("goal5", $scope.selectedNote.goal5);
          ux.fillInput("note", $scope.selectedNote.note);
        }
        else {
          $scope.selectedNote = {};
        }
      }).error(function(data, status) {
        console.log(data);
        console.log('error!');
        console.log(status);
      });
    };

    $scope.getAllNotes();

    $scope.saveNewNote = function() {
      $http.post('api/v_0_0_1/notes', $scope.newNote)
        .success(function(data) {
          console.log('notes-controller(44)');
          console.log(data);
          console.log($scope.notes);
          if(Array.isArray($scope.notes)) $scope.notes.push(data);
          else $scope.notes = [data];
          console.log($scope.notes);
          alert("Your self-assessment has been submitted. Thank you!");
          window.location="/#/home";
        })
        .error(function(data, status) {
          console.log(data);
          alert("There was a problem submitting your assessment");
        });
    };

    $scope.editNote = function(note) {
      note.editing = true;
    };

    $scope.saveNote = function(note) {
      note.editing = null;
      $http.put('api/v_0_0_1/notes/' + note._id, note)
        .success(function(data) {
          alert("PGP Saved, Refreshing survey list");
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
    };

      $scope.saveGenResource = function() {
        $scope.saveGResource.resourceFor = 'General';
        $http.post('api/v_0_0_1/resources/', $scope.saveGResource)
          .success(function(data) {
            if(typeof $scope.genResources !== 'undefined'){
              $scope.genResources.push(data);
            }
            else{
              $scope.genResources = [data];
              $scope.selectedG1Res = $scope.genResources[0];
            }
            alert("New General Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.getAllResources = function() {
        $http({
          method: 'GET',
          url: '/api/v_0_0_1/resources/'
        }).success(function(data) {
          console.log('nc131');
          console.dir(data);
          $scope.resources = data;
          for(var i = 0; i < data.length; i++){
            console.log(i+', '+data[i].resourceFor);
            switch (data[i].resourceFor){
              case 'General':
                console.log(data[i].resource);
                $scope.genResources = data[i].resource;
                $scope.selectedG1Res = $scope.genResources[0];
                $scope.selectedG2Res = $scope.genResources[0];
                $scope.selectedG3Res = $scope.genResources[0];
                $scope.selectedG4Res = $scope.genResources[0];
                $scope.selectedG5Res = $scope.genResources[0];
                break;
              default:
                break;
            }
          }
          console.log('nc(146)');
          console.log($scope.genResources);
//          for(var resfor in data){
//            console.log('property');
//            console.log(resfor);
//          }
       //   $scope.selectedG1Res = $scope.genresources[0];

        }).error(function(data, status) {
          console.dir(data);
          console.log('error!');
          console.log(status);
        });
      };

      $scope.getAllResources();


      //add Resources **************************************************************************************************
      //no target coming through and extra argument does not work either so separate handlers Angular?
      $scope.addg1Resource = function(sel){
        $scope.selectedNote.goalsrc1.push(sel);
      };
      $scope.addg2Resource = function(sel){
        $scope.selectedNote.goalsrc2.push(sel);
      };
      $scope.addg3Resource = function(sel){
        $scope.selectedNote.goalsrc3.push(sel);
      };
      $scope.addg4Resource = function(sel){
        $scope.selectedNote.goalsrc4.push(sel);
      };
      $scope.addg5Resource = function(sel){
        $scope.selectedNote.goalsrc5.push(sel);
      };

    }
  });
};
