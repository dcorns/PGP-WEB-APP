/**
 * createPGPcontroller
 * Created by dcorns on 3/12/15.
 */
'use strict';
var errHandle = require('../js/handleErrors')();
module.exports = function(){
  //check authorization before loading data
  var storage = window.sessionStorage;
  var pgpArray = [];
  var pgpResources = {};
  var genResources = [], HTMLResources = [], CSSResources = [], JSResources = [], GITResources = [], DSAResources = [], CMDResources = [], OOPResources = [];
  var selG1Res, selG2Res, selG3Res, selG4Res, selG5Res;
  var selHTMLRes, selCSSRes, selJSRes, selGITRes, selDSARes, selCMDRes, selOOPRes;
  var token = storage.getItem('token');
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
        var sG1 = document.getElementById('sG1');
        if(formIdx){
          dgApp.pgpMdl = pgpArray[formIdx];
          studentSelect.selectedIndex = formIdx;
        }
        else{
          dgApp.pgpMdl = pgpArray[0];
          storage.setItem('formIdx', '0');
        }

        getAllResources(data.u);

        dgApp.dgMethod.dataLoadSelect('sG1', data.n, 'name', '_id');

        studentSelect.addEventListener('click', function(e){
          var idx = e.srcElement.selectedOptions[0].accessKey;
          dgApp.pgpMdl = pgpArray[idx];
          storage.setItem('formIdx', idx);
          bindViewData();

        });
        studentSelect.addEventListener('change', function(e){
          var idx = e.srcElement.selectedOptions[0].accessKey;
          dgApp.pgpMdl = pgpArray[idx];
          storage.setItem('formIdx', idx);
          bindViewData();
        });

      }

    }, token);
  }

  function bindViewData(){
    document.getElementById('preGoala').innerHTML = dgApp.pgpMdl['goal'];
    document.getElementById('postGoala').innerHTML = dgApp.pgpMdl['goala'];
  }
  function getAllResources(usr){
    dgApp.dgMethod.ajaxPostJson('/api/v_0_0_1/pgps/resources/',usr, function(err, data){
      console.log('getAllResources');
      if(err){
        errHandle.alertObject(err); return;
      }
      pgpResources = data;
      console.dir(pgpResources);
      //for (var i = 0; i < pgpResources.length; i++) {
      //  pgpResources[i].resource.sort(function(a, b){
      //    if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
      //    if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
      //    return 0;
      //  });
      //  switch (pgpResources[i].resourceFor) {
      //    case 'General':
      //      genResources = pgpResources[i].resource;
      //      break;
      //    case 'HTML':
      //      HTMLResources = pgpResources[i].resource;
      //      break;
      //    case 'CSS':
      //      CSSResources = pgpResources[i].resource;
      //      break;
      //    case 'JS':
      //      JSResources = pgpResources[i].resource;
      //      break;
      //    case 'GIT':
      //      GITResources = pgpResources[i].resource;
      //      break;
      //    case 'DSA':
      //      DSAResources = pgpResources[i].resource;
      //      break;
      //    case 'CMD':
      //      CMDResources = pgpResources[i].resource;
      //      break;
      //    case 'OOP':
      //      OOPResources = pgpResources[i].resource;
      //      break;
      //    default:
      //      break;
      //  }
      //}
      //selG1Res = genResources[0];
      //selG2Res = genResources[0];
      //selG3Res = genResources[0];
      //selG4Res = genResources[0];
      //selG5Res = genResources[0];
      //selHTMLRes = HTMLResources[0];
      //selCSSRes = CSSResources[0];
      //selJSRes = JSResources[0];
      //selGITRes = GITResources[0];
      //selDSARes = DSAResources[0];
      //selCMDRes = CMDResources[0];
      //selOOPRes = OOPResources[0];

    });
  }

  function removeResource(e, item, rsrc, rsrcFor){
    var obj = {resourceFor: rsrcFor, resource: item};
    if(e.altKey){
      dgApp.dgMethod.ajaxPutJson('api/v_0_0_1/resources/', obj, function(err, data){
        if(err){
          errHandle.alertObject(err); return;
        }
        console.log(data);
        alert(data.title +' deleted!');
        getAllResources();
      });
    }
  }

  function saveResource(nrsrc, rsrc, rsrcFor, inputClass){
    nrsrc.resourceFor = rsrcFor;
    dgApp.dgMethod.ajaxPostJson('api/v_0_0_1/resources/', nrsrc, function(data){
      if(err){
        errHandle.alertObject(err); return;
      }
      if (typeof rsrc !== 'undefined') {
        rsrc.push(data);
      }
      else {
        rsrc = [data];
      }
      alert("New " + rsrcFor + " Resource Saved!");
    });
  }

  function addResource(sel, rsrc){
    rsrc.push(sel);
  }

  function removeRsrcFromPGP(e, item, rsrc){
    if(e.altKey){
      var idx = rsrc.indexOf(item);
      rsrc.splice(idx, 1);
    }
  }

};