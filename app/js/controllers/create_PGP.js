/**
 * create_PGP
 * Created by dcorns on 6/1/15.
 */
'use strict';
module.exports = function(){
  //set button visibility
  document.getElementById('btncreateaccount').style.display = 'none';
  document.getElementById('btnlogin').style.display = 'none';
  document.getElementById('btnviewpgp').style.display = 'inline';
 var test = document.getElementById('ss');
  console.dir(test);
  var dataobj = {};
  var storage = window.sessionStorage, pgpArray = [], pgpResources = [], pgpTopics = [], token = storage.getItem('token');
  if(token){
    dgApp.dgMethod.ajaxGet('/api/v_0_0_1/pgps', function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      if(data){
        pgpArray = data.n;
        var formIdx = storage.getItem('formIdx');
        dgApp.dgMethod.dataLoadSelect('studentSelect', data.n, 'name', '_id');
        var studentSelect = document.getElementById('studentSelect');
        //sync studentSelect index from previous pages if it was selected
        if(formIdx){
          dgApp.pgpMdl = pgpArray[formIdx];
          studentSelect.selectedIndex = formIdx;
        }
        else{
          dgApp.pgpMdl = pgpArray[0];
          storage.setItem('formIdx', '0');
        }
        //
        dgApp.userId = data.u._id;
        getAllResources(data.u);
        addHandlers();
      }

    }, token);
  }
  function getAllResources(usr){
    dgApp.dgMethod.ajaxPostJson('/api/v_0_0_1/pgps/resources/',usr, function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      pgpResources = data.resourceList;
      console.dir(pgpResources);
      pgpTopics = data.topicList;
      dgApp.dgMethod.dataLoadSelect('resources2', pgpResources, 'title');
      dgApp.dgMethod.makeFormCheckBoxGroup('rTypes', pgpTopics, 'name', 'description', 'cId');
      //register superSelect component
      dataobj.pgpResources = pgpResources;
      dataobj.pgpTopics = pgpTopics;
      dataobj.titles = ['title', 'description', 'resourceLink', 'addedBy'];
     // var ss = document.getElementById('ss');
      document.querySelector('super-select').itemlist = pgpResources;
      document.querySelector('super-select').associations = pgpTopics;
      document.querySelector('super-select').displayitems = [{prop: 'title'}];
console.dir(document.querySelector('super-select'));
    });
  }
  function addHandlers(){

    //var studentSelect = document.getElementById('studentSelect');
    ////studentSelect.addEventListener('click', setPgpData);
    ////studentSelect.addEventListener('change', setPgpData);
    //document.getElementById('btnSaveNewResource').addEventListener('click', function(e){
    //  var topicFrm = document.getElementById('chooseResourceTopics');
    //  var topicArray = [];
    //  var c = 0, len = topicFrm.length;
    //  for (c; c < len; c++) {
    //    if (topicFrm[c].checked) {
    //      topicArray.push(parseInt(topicFrm[c].alt));
    //    }
    //  }
    //  //resrcTitle resrcDescription resrcLink
    //  var newResource = {title: document.getElementById('resrcTitle').value, topics: topicArray};
    //  newResource.description = document.getElementById('resrcDescription').value;
    //  newResource.resourceLink = document.getElementById('resrcLink').value;
    //  var errorString = dgApp.dgClientValidate.validateResource(newResource);
    //  if (errorString.length > 0) {
    //    alert(errorString);
    //  }
    //  else{
    //    newResource.token = token;
    //    console.dir(newResource);
    //    if(dgApp.dgMethod.arrayContains(pgpResources, newResource.title, 'title')){
    //      alert(newResource.title + ' is already a resource title.');
    //    }
    //    else{
    //      if(dgApp.dgMethod.arrayContains(pgpResources, newResource.resourceLink, 'resourceLink') && (newResource.resourceLink !== '')){
    //        alert(newResource.resourceLink + ' is already a resource link');
    //      }
    //      else{
    //        //save resource
    //        saveResource(newResource, pgpResources);
    //      }
    //    }
    //  }
    //});
    //var selResources = document.getElementById('resources');
    //selResources.addEventListener('click', function(e){
    //  if (e.altKey) {
    //    removeResource(e);
    //  }
    //});

  }

  function populateResourceTypeElements(e){
   console.dir(e);
  }
  function resourceOptionClick(e){
    console.dir(e);
  }

};