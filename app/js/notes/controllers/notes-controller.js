'use strict';

module.exports = function (app) {
  app.controller('notesController', function ($scope, $http) {
    var ui = require('../../ui');
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
          console.log('nc26'); console.dir(data);
          if (data) {
            if (Array.isArray(data.n)) {
              //is ta so user object and note array received
              $scope.notes = data.n;
              document.getElementById('btnviewpgp').className = 'nav_ul-li';
              document.getElementById('btncreatepgp').className = 'nav_ul-li';
            }
            else {
              // is student so single note received
              $scope.notes = [data];
              if($scope.notes[0].recComplete){
                window.location = "/#/view_PGP";
              }
            }
            $scope.selectedNote = $scope.notes[0];

            //load input fields with existing data
            $scope.hidetest = true;
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
        }).error(function (data, status) {
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };

      $scope.getAllNotes();

      $scope.saveNewNote = function () {
        $http.post('api/v_0_0_1/notes', $scope.newNote)
          .success(function (data) {
            console.log('notes-controller(44)');
            console.log(data);
            console.log($scope.notes);
            if (Array.isArray($scope.notes)) $scope.notes.push(data);
            else $scope.notes = [data];
            console.log($scope.notes);
            alert("Your self-assessment has been submitted. Thank you!");
            window.location = "/#/home";
          })
          .error(function (data, status) {
            console.log(data);
            alert("There was a problem submitting your assessment");
          });
      };

      $scope.editNote = function (note) {
        note.editing = true;
      };

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

      $scope.removeResource = function (e, item, rsrc, rsrcFor) {
        item.resourceFor = rsrcFor;
        console.dir(e); console.dir(item); console.dir(rsrc);
        if(e.altKey){
          $http.delete('api/v_0_0_1/resources/', item)
            .success(function (data) {
              console.dir('nc127'); console.dir(data);
            })
            .error(function (data) {
            });
        }
      };

      $scope.saveResource = function (nrsrc, rsrc, rsrcFor) {
        console.dir(nrsrc); console.dir(rsrc); console.dir(rsrcFor);
        nrsrc.resourceFor = rsrcFor;
        $http.post('api/v_0_0_1/resources/', nrsrc)
          .success(function (data) {
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

      $scope.getAllResources();

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
    }
  });
};
