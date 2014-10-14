'use strict';

module.exports = function(app) {
  app.controller('notesController', function($scope, $http) {
    var ui = require('../../ui');
    var ux = ui();
    //hide buttons before authorization
    ux.startHidden();
    ux.setToggles();

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

      $scope.savehtmlResource = function() {
        $scope.saveHTMLResource.resourceFor = 'HTML';
        $http.post('api/v_0_0_1/resources/', $scope.saveHTMLResource)
          .success(function(data) {
            if(typeof $scope.HTMLResources !== 'undefined'){
              $scope.HTMLResources.push(data);
            }
            else{
              $scope.HTMLResources = [data];
              $scope.selectedHTMLRes = $scope.HTMLResources[0];
            }
            alert("New HTML Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.savecssResource = function() {
        $scope.saveCSSResource.resourceFor = 'CSS';
        $http.post('api/v_0_0_1/resources/', $scope.saveCSSResource)
          .success(function(data) {
            if(typeof $scope.CSSResources !== 'undefined'){
              $scope.CSSResources.push(data);
            }
            else{
              $scope.CSSResources = [data];
              $scope.selectedCSSRes = $scope.CSSResources[0];
            }
            alert("New CSS Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.savejsResource = function() {
        $scope.saveJSResource.resourceFor = 'JS';
        $http.post('api/v_0_0_1/resources/', $scope.saveJSResource)
          .success(function(data) {
            if(typeof $scope.JSResources !== 'undefined'){
              $scope.JSResources.push(data);
            }
            else{
              $scope.JSResources = [data];
              $scope.selectedJSRes = $scope.JSResources[0];
            }
            alert("New JavaScript Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.savegitResource = function() {
        $scope.saveGITResource.resourceFor = 'GIT';
        $http.post('api/v_0_0_1/resources/', $scope.saveGITResource)
          .success(function(data) {
            if(typeof $scope.GITResources !== 'undefined'){
              $scope.GITResources.push(data);
            }
            else{
              $scope.GITResources = [data];
              $scope.selectedGITRes = $scope.GITResources[0];
            }
            alert("New HTML Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.savedsaResource = function() {
        $scope.saveDSAResource.resourceFor = 'DSA';
        $http.post('api/v_0_0_1/resources/', $scope.saveDSAResource)
          .success(function(data) {
            if(typeof $scope.DSAResources !== 'undefined'){
              $scope.DSAResourses.push(data);
            }
            else{
              $scope.DSAResources = [data];
              $scope.selectedDSARes = $scope.DSAResources[0];
            }
            alert("New Data Structures and Algorithms Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.savecmdResource = function() {
        $scope.saveCMDResource.resourceFor = 'CMD';
        $http.post('api/v_0_0_1/resources/', $scope.saveCMDResource)
          .success(function(data) {
            if(typeof $scope.CMDResources !== 'undefined'){
              $scope.CMDResources.push(data);
            }
            else{
              $scope.CMDResources = [data];
              $scope.selectedCMDRes = $scope.CMDResources[0];
            }
            alert("New Terminal Resource Saved!");
          })
          .error(function(data) {
            console.log(data);
          });
      };

      $scope.saveoopResource = function() {
        $scope.saveOOPResource.resourceFor = 'OOP';
        $http.post('api/v_0_0_1/resources/', $scope.saveOOPResource)
          .success(function(data) {
            if(typeof $scope.OOPResources !== 'undefined'){
              $scope.OOPResources.push(data);
            }
            else{
              $scope.OOPResources = [data];
              $scope.selectedOOPRes = $scope.OOPResources[0];
            }
            alert("New Object-orientated Programing Resource Saved!");
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

      $scope.addHTMLResource = function(sel){
        $scope.selectedNote.recsrc1.push(sel);
      };
      $scope.addCSSResource = function(sel){
        $scope.selectedNote.recsrc2.push(sel);
      };
      $scope.addJSResource = function(sel){
        $scope.selectedNote.recsrc3.push(sel);
      };
      $scope.addGITResource = function(sel){
        $scope.selectedNote.recsrc4.push(sel);
      };
      $scope.addDSAResource = function(sel){
        $scope.selectedNote.recsrc5.push(sel);
      };
      $scope.addCMDResource = function(sel){
        $scope.selectedNote.recsrc6.push(sel);
      };
      $scope.addOOPResource = function(sel){
        $scope.selectedNote.recsrc7.push(sel);
      };

    }
  });
};
