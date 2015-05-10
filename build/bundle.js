(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * createAccountController
 * Created by dcorns on 3/12/15.
 */
'use strict';
module.exports = function(){
  alert('Create Account Controller');
};
},{}],2:[function(require,module,exports){
/**
 * createPGPcontroller
 * Created by dcorns on 3/12/15.
 */
'use strict';
var errHandle = require('../js/handleErrors')();
module.exports = function(){
  //check authorization before loading data
  var storage = window.sessionStorage;
  var pgpArray = [], pgpResources = [], pgpTopics = [];
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
        if(formIdx){
          dgApp.pgpMdl = pgpArray[formIdx];
          studentSelect.selectedIndex = formIdx;
        }
        else{
          dgApp.pgpMdl = pgpArray[0];
          storage.setItem('formIdx', '0');
        }
        dgApp.userId = data.u._id;
        getAllResources(data.u);
        addHandlers();
      }

    }, token);
  }

  function bindPgpData(){
    document.getElementById('preGoala').innerHTML = dgApp.pgpMdl['goal'];
    document.getElementById('postGoala').innerHTML = dgApp.pgpMdl['goala'];
  }
  function getAllResources(usr){
    dgApp.dgMethod.ajaxPostJson('/api/v_0_0_1/pgps/resources/',usr, function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      pgpResources = data.resourceList;
      pgpTopics = data.topicList;
      dgApp.dgMethod.dataLoadSelect('sG1', pgpResources, 'title');
      dgApp.dgMethod.makeFormCheckBoxGroup('chooseResourceTopics', pgpTopics, 'name', 'description', 'cId');
    });
  }

  function removeResource(e, item, rsrc, rsrcFor){
    var rmvOption = e.target.selectedOptions[0];
    var ridx = rmvOption.index;
    var rmRsrc = pgpResources[ridx];
    rmRsrc.token = token;
    dgApp.dgMethod.ajaxPostJson('/api/v_0_0_1/pgps/resources/remove', rmRsrc, function(err, success){
      if(err){
        errHandle.alertObject(err); return;
      }
      if(success){
        pgpResources.splice(ridx, 1);
        dgApp.dgMethod.dataLoadSelect('sG1', pgpResources, 'title');
        alert('Resource Deleted!');
      }

    }, token);
  }

  function saveResource(nrsrc, rsrc){
    console.log('save resource invoked');
    dgApp.dgMethod.ajaxPostJson('api/v_0_0_1/pgps/resources/save', nrsrc, function(err, data){
      console.dir(data);
      if(err){
        errHandle.alertObject(err); return;
      }
      if (typeof pgpResources !== 'undefined') {
        pgpResources.push(data[0]);
      }
      else {
        pgpResources = data;
      }
      dgApp.dgMethod.selectAddOption('sG1', data[0], 'title');
      alert("New Resource Saved!");
    }, token);
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

  function addHandlers(){

    var studentSelect = document.getElementById('studentSelect');
    studentSelect.addEventListener('click', setPgpData);
    studentSelect.addEventListener('change', setPgpData);
    document.getElementById('btnSaveResource').addEventListener('click', function(e){
      var topicFrm = document.getElementById('chooseResourceTopics');
      var topicArray = [];
      var c = 0, len = topicFrm.length;
      for (c; c < len; c++) {
        if (topicFrm[c].checked) {
          topicArray.push(parseInt(topicFrm[c].alt));
        }
      }
        //resrcTitle resrcDescription resrcLink
        var newResource = {title: document.getElementById('resrcTitle').value, topics: topicArray};
        newResource.description = document.getElementById('resrcDescription').value;
        newResource.resourceLink = document.getElementById('resrcLink').value;
        var errorString = dgApp.dgClientValidate.validateResource(newResource);
        if (errorString.length > 0) {
          alert(errorString);
        }
      else{
          newResource.token = token;
          console.dir(newResource);
          if(dgApp.dgMethod.arrayContains(pgpResources, newResource.title, 'title')){
            alert(newResource.title + ' is already a resource title.');
          }
          else{
            if(dgApp.dgMethod.arrayContains(pgpResources, newResource.resourceLink, 'resourceLink') && (newResource.resourceLink !== '')){
              alert(newResource.resourceLink + ' is already a resource link');
            }
            else{
              //save resource
              saveResource(newResource, pgpResources);
            }
          }
        }
    });
    var fg1 = document.getElementById('fG1');
    fg1.addEventListener('click', function(e){
      if (e.altKey) {
        removeResource(e);
      }
    });
  }

  function setPgpData(e){
    var idx = e.srcElement.selectedOptions[0].accessKey;
    dgApp.pgpMdl = pgpArray[idx];
    storage.setItem('formIdx', idx);
    bindPgpData();
  }

};
},{"../js/handleErrors":12}],3:[function(require,module,exports){
/**
 * homeController
 * Created by dcorns on 3/12/15.
 */
'use strict';
module.exports = function(){

};
},{}],4:[function(require,module,exports){
/**
 * loginController
 * Created by dcorns on 3/12/15.
 */
'use strict';
var errHandle = require('../js/handleErrors')();
var firstDo = function(){
  dgApp.dgMethod.dataBindInput(document.getElementById('username'), 'change', 'userMdl', 'email');
  dgApp.dgMethod.dataBindInput(document.getElementById('password'), 'change', 'userMdl', 'password');
};
var userLogin = function() {
  var storage = window.sessionStorage;
  storage.removeItem('token');
 dgApp.dgMethod.ajaxPostJson('api/v_0_0_1/login', dgApp.userMdl, function(err, data){
   if(err){
     errHandle.alertObject(err); return;
   }
   storage.setItem('token', data.user.atoken);
   var roll = data.user.roll;
   if(roll === 'ta' || roll === 'admin'){
     window.location="/#/create_PGP";
   }
   else {
     if (roll === 'student') {
       var btnSurvey = document.getElementById('btnsurvey');
       btnSurvey.className = 'nav_ul-li';
       //Save note to local storage
       var sessionNote = SOS(data.note);
       sessionNote.saveNote();
       if (data.note.recComplete) window.location = '/#/view_PGP';
       else window.location = '/#/student_survey';
     }
   }
 });
};

module.exports = function(){
  document.getElementById('btnLogin').onclick = userLogin;
  firstDo();
};
},{"../js/handleErrors":12}],5:[function(require,module,exports){
/**
 * preViewPGPcontroller
 * Created by dcorns on 3/12/15.
 */
'use strict';
module.exports = function(){
  alert('Preview PGP controller');
};
},{}],6:[function(require,module,exports){
/**
 * surveyController
 * Created by dcorns on 3/9/15.
 */
'use strict';
module.exports = function(){
  alert('Survey Controller');
};
},{}],7:[function(require,module,exports){
/**
 * viewPGPcontroller
 * Created by dcorns on 3/9/15.
 */
'use strict';
module.exports = function(){
  alert('view PGP controller');
};
},{}],8:[function(require,module,exports){
'use strict';
var dgApp = {};
dgApp.homeView = require('../views/homeView');
dgApp.homeCtrl = require('../controllers/homeController');
dgApp.loginView = require('../views/loginView');
dgApp.loginCtrl = require('../controllers/loginController');
dgApp.createAccountCtrl = require('../controllers/createAccountController');
dgApp.surveyCtrl = require('../controllers/surveyController');
dgApp.createPgpView = require('../views/createPgpView');
dgApp.createPGPCtrl = require('../controllers/createPGPcontroller');
dgApp.previewPGPCtrl = require('../controllers/previewPGPcontroller');
dgApp.viewPGPCtrl = require('../controllers/viewPGPcontroller');

require('../models/userModel')(dgApp); //adds userMdl object
require('../models/pgpModel')(dgApp); //adds pgpMdl object
require('../js/dgRouteProvider')(dgApp); //adds loadRoute method to dgApp
require('../js/dgMethods')(dgApp); //add dgMethod object to dgApp
require('../js/clientValidation')(dgApp); //add client validation

function firstDo(){
  window.dgApp = dgApp;
  //Handle Refresh by checking session storage for last href and redirecting if it exists
  var lastHref = window.sessionStorage.getItem('href');
  var netAction = window.sessionStorage.getItem('netAction');
    if (lastHref) {
      dgApp.loadRoute(lastHref);
    }
    else {//load home template
      lastHref = '#/home';
      window.sessionStorage.setItem('href', lastHref);
      window.history.pushState(null, null, lastHref);
      dgApp.loadRoute(lastHref);
    }
    //Add event handlers for 'a' tags
    var links = document.getElementsByTagName('a');
    var idx = 0, ln = links.length;
    for (idx; idx < ln; idx++) {
      links[idx].addEventListener('click', function (e) {
        window.sessionStorage.setItem('href', this.href);
        window.history.pushState(null, null, this.href);
        e.preventDefault();
        dgApp.loadRoute(this.href);
      });
    }
    //Add front and back button handler
    window.addEventListener('popstate', function () {
      window.sessionStorage.setItem('href', location.href);
      dgApp.loadRoute(location.href);
    });
}

dgApp.dgMethod.winReady(firstDo);
},{"../controllers/createAccountController":1,"../controllers/createPGPcontroller":2,"../controllers/homeController":3,"../controllers/loginController":4,"../controllers/previewPGPcontroller":5,"../controllers/surveyController":6,"../controllers/viewPGPcontroller":7,"../js/clientValidation":9,"../js/dgMethods":10,"../js/dgRouteProvider":11,"../models/pgpModel":17,"../models/userModel":18,"../views/createPgpView":19,"../views/homeView":20,"../views/loginView":21}],9:[function(require,module,exports){
/**
 * clientValidation
 * Created by dcorns on 4/28/15.
 * single value validations return an empty string if valid, otherwise they return an error message string
 * multi-value validations recieve an object and return an empty array if valid, otherwise they return an array of error objects of the form {property: error message}
 */
'use strict';
var dgClientValidate = {};

function validateTitleTextLength(str){
  var valid = 'Title must be less than 25 characters long', len = str.length;
  if (len < 25) {
    valid = '';
  }
  if (len < 2) {
    valid = 'Title must be at least 2 characters long';
  }
  return valid;
}

function validateTitleCharacters(str){
  var valid = 'Title can only contain alphanumeric characters and -, \', \"';
  var regx = /^[A-Za-z\d\s'"-]+$/;
  if (regx.test(str)) {
    valid = '';
  }
  return valid;
}

function validateDescriptionCharacters(str){
  var valid = 'Description can only contain alphanumeric characters, -, \', \", and period';
  var regx = /^[A-Za-z\d\s'"-\.]+$/;
  if (regx.test(str)) {
    valid = '';
  }
  return valid;
}

function validateResourceTopicArray(ary){
  var valid = 'Please select at least one topic to save a new resource';
  if (ary.length > 0) {
    valid = '';
  }
  return valid;
}

function validateLink(lnk){
  var valid = 'Resource Links must start with http(s):// and not contain any unsafe characters (^, %, , <>, [], {}, #, \\, \", `, ~, |)';
  var regx = /^https?:\/\/.*[^%<>\s#\{\}"|\\\^\[\]`~]$/i;
  if (regx.test(lnk)) {
    valid = '';
  }
  return valid;
}

function validateResourceDescription(str){
  var valid = 'A two or more word description is required';
  var regx = /^.*\s\S.*$/;
  if(regx.test(str)){
    if (str) {
      valid = validateDescriptionCharacters(str);
    }
  }
  return valid;
}

dgClientValidate.validateResource = function (resourceObj){
  var errCount = 0, errorObj = {title:[], description:[], resourceLink:[], resourceTopics:[]}, result = '', validate;

  validate = validateTitleTextLength(resourceObj.title);
  errorObj.title = checkValidate(validate, errorObj.title);

  validate = validateTitleCharacters(resourceObj.title);
  errorObj.title = checkValidate(validate, errorObj.title);

  validate = validateResourceTopicArray(resourceObj.topics);
  errorObj.resourceTopics = checkValidate(validate, errorObj.resourceTopics);

  validate = validateResourceDescription(resourceObj.description);
  errorObj.description = checkValidate(validate, errorObj.description);

  if(resourceObj.resourceLink) {
    validate = validateLink(resourceObj.resourceLink);
    errorObj.resourceLink = checkValidate(validate, errorObj.resourceLink);
  }

  if(errCount > 0) {
    result = buildErrorString(errorObj);
  }

  return result;

  function checkValidate(validator, errorAry){
    if(validator.length > 0){
      errorAry.push(validator);
      errCount += 1;
    }
    return errorAry;
  }
};

function buildErrorString(errObj){
  var errorString = '';
  for (var prop in errObj){
    if(errObj.hasOwnProperty(prop)){
      if(errObj[prop].length > 0){
        errorString = errorString + prop + ':\n';
        var c = 0, len = errObj[prop].length;
        for (c; c < len; c++) {
          errorString = errorString + errObj[prop][c] + '\n';
        }
      }
    }
  }
  return errorString;
}

module.exports = function (app) {
  app.dgClientValidate = dgClientValidate;
};
},{}],10:[function(require,module,exports){
/**
 * dgMethods
 * Created by dcorns on 3/16/15.
 * Common methods for dgApp
 */
'use strict';
var dgMethod = {};
//Method for setting scripts to run after the window loads
dgMethod.winReady = function(f){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = f;
  }
  else{
    window.onload = function() {
      preOnload();
      f();
    }
  }
};

dgMethod.ajaxPostJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
if(token){
  ajaxReq.setRequestHeader('Authorization', token);
}
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxPutJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('PUT', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxGet = function(url, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('GET', url, true);
  //ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send();
};

dgMethod.dataBindInput = function(elem, evnt, mdl, item){
  elem.addEventListener(evnt, function(){
    dgApp[mdl][item] = this.value;
  });
};

dgMethod.dataLoadSelect = function(elId, ary, item){
  var el = document.getElementById(elId);
  el.innerHTML = '';
  var len = ary.length, c = 0, opt, display;
  for(c; c < len; c++){
    if(Array.isArray(item)){
      display = '';
      var itLen = item.length, itC = 0;
      for(itC; itC < itLen; itC++){
        display = display + ary[c][item[itC]] + '|';
      }
      display = display.substr(0, display.length - 1);
    }
    else{
      display = '<label class=selOptTitle>' + ary[c][item] + '</label>';
    }
    opt = document.createElement('option');
    opt.innerHTML = display;
    opt.accessKey = c;
    el.appendChild(opt);
  }

  dgMethod.makeFormCheckBoxGroup = function(formID, data, nameKey, descriptionKey, idKey){
    var elId = document.getElementById(formID), c = 0, len = data.length, cb, cblbl;
    console.dir(formID);
    for(c; c < len; c++){
      cb = document.createElement('input');
      cb.id = formID+ 'Cb' + c;
      cb.title = data[c][descriptionKey];
      cblbl = document.createElement('label');
      cblbl.for = cb.id;
      cblbl.innerHTML = data[c][nameKey];
      cb.setAttribute('type', 'checkbox');
      cb.alt = data[c][idKey] || c;
      elId.appendChild(cblbl);
      elId.appendChild(cb);
    }
  }
};

dgMethod.arrayContains = function(ary, aValue, aKey){
  var c = 0, len = ary.length;
  if (aKey) {
    for (c; c < len; c++) {
      if(ary[c][aKey] === aValue) return true;
    }
  }
  else{
    for (c; c < len; c++) {
      if(ary[c] === aValue) return true;
    }
  }
};

dgMethod.selectAddOption = function (selId, optObj, item){
  var opt = document.createElement('option');
  opt.innerHTML = optObj[item];
  console.log(opt.innerHTML);
  var sel = document.getElementById(selId);
  opt.accessKey = sel.options.length;
  sel.appendChild(opt);
};

module.exports = function (app){
  app.dgMethod = dgMethod;
};
},{}],11:[function(require,module,exports){
/**
 * dgRouteProvider
 * Created by dcorns on 3/6/15.
 * Handles client routing and the script/controller that is used for each route
 */
'use strict';

function loadRoute(rtObj){
  rtObj.view(); rtObj.controller();
}

module.exports = function(app){
  app.loadRoute = function(dgRoute){
    //grab the '#' and everything that follows it.
    dgRoute = dgRoute.substr(dgRoute.indexOf('#'));
    switch(dgRoute) {
      case '#/student_survey':
        return loadRoute({
          templateUrl: 'views/student_survey.html',
          view: function(){},
          controller: app.surveyCtrl
        });
        break;
      case '#/create_PGP':
        return loadRoute({
          templateUrl: 'views/create_PGP.html',
          view: app.createPgpView,
          controller: app.createPGPCtrl
        });
        break;
      case '#/preview_PGP':
        return loadRoute({
          templateUrl: 'views/preview_PGP.html',
          view: function(){},
          controller: app.previewPGPCtrl
        });
        break;
      case '#/view_PGP':
        return loadRoute({
          templateUrl: 'views/view_PGP.html',
          view: function(){},
          controller: app.viewPGPCtrl
        });
        break;
      case '#/create_Account':
        return loadRoute({
          templateUrl: 'views/create_Account.html',
          view: function(){},
          controller: app.createAccountCtrl
        });
        break;
      case '#/login':
        return loadRoute({
          templateUrl: 'views/login.html',
          view: app.loginView,
          controller: app.loginCtrl
        });
        break;
      case '#/home':
        return loadRoute({
          templateUrl: 'views/home.html',
          view: app.homeView,
          controller: app.homeCtrl
        });
        break;
      default:
        return loadRoute({
          templateUrl: 'views/home.html',
          view: app.homeView,
          controller: app.homeCtrl
        });
        break;
    }
};
};
},{}],12:[function(require,module,exports){
/**
 * Created by dcorns on 11/14/14.
 */
'use strict';
module.exports = function(){
  return{
    alertObject: function(obj){
      var msg = '';
      for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
          msg = msg + obj[prop] + '\n';
        }
      }
      return alert(msg);
    }
  };
};
},{}],13:[function(require,module,exports){
/**
 * Created by dcorns on 11/10/14.
 */
'use strict';
module.exports = function(obj){
  return {
    buildSurvey: function(){
      obj.name = window.sessionStorage.getItem('name');
      obj.ta = window.sessionStorage.getItem('ta');
      obj.student = window.sessionStorage.getItem('student');
      obj.course = window.sessionStorage.getItem('course');
      obj.rtg1 = window.sessionStorage.getItem('rtg1');
      obj.rtg2 = window.sessionStorage.getItem('rtg2');
      obj.rtg3 = window.sessionStorage.getItem('rtg3');
      obj.rtg4 = window.sessionStorage.getItem('rtg4');
      obj.rtg5 = window.sessionStorage.getItem('rtg5');
      obj.rtg6 = window.sessionStorage.getItem('rtg6');
      obj.rtg7 = window.sessionStorage.getItem('rtg7');
      obj.note = window.sessionStorage.getItem('note');
      obj.goal = window.sessionStorage.getItem('goal');
      obj.goal2 = window.sessionStorage.getItem('goal2');
      obj.goal3 = window.sessionStorage.getItem('goal3');
      obj.goal4 = window.sessionStorage.getItem('goal4');
      obj.goal5 = window.sessionStorage.getItem('goal5');
      obj.rtgComplete = window.sessionStorage.getItem('rtgComplete');
      return obj;
    }
  }
};
},{}],14:[function(require,module,exports){
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
},{"../js/ui":16}],15:[function(require,module,exports){
/**
 * Created by dcorns on 11/9/14.
 */
'use strict';

module.exports = function(obj){
  return {
    saveNote: function(){
      for (var prop in obj) {
        if(obj.hasOwnProperty( prop )) {
          if(obj[prop]){
            if(Array.isArray(obj[prop])){
              for(var i = 0; i < obj[prop].length; i++){
                for(var subProp in obj[prop][i]){
                  if(obj[prop][i].hasOwnProperty(subProp)){
                    window.sessionStorage.setItem(prop+subProp+i, obj[prop][i][subProp]);
                  }
                }

                console.dir(obj[prop][i]);
              }
            }
            else{
              window.sessionStorage.setItem(prop, obj[prop]);
            }
          }
        }
      }
    }
  }
};
},{}],16:[function(require,module,exports){
/**
 * Created by dcorns on 10/7/14.
 */
'use strict';
module.exports = function () {
  return {
    fillInput: function (id, val) {
      if (document.getElementById(id)) {
        console.log(id + ',' + val);
        document.getElementById(id).value = val || "";
        return this;
      }
    },
    startHidden: function () {
      this.hideMainButtons();
      document.getElementById('btnGoalsOn').className = 'hidden';
      document.getElementById('btnAssOn').className = 'hidden';
      document.getElementById('btnG1On').className = 'hidden';
      document.getElementById('btnG2On').className = 'hidden';
      document.getElementById('btnG3On').className = 'hidden';
      document.getElementById('btnG4On').className = 'hidden';
      document.getElementById('btnG5On').className = 'hidden';
      document.getElementById('btnHTMLOn').className = 'hidden';
      document.getElementById('btnCSSOn').className = 'hidden';
      document.getElementById('btnJSOn').className = 'hidden';
      document.getElementById('btnGITOn').className = 'hidden';
      document.getElementById('btnDSAOn').className = 'hidden';
      document.getElementById('btnCMDOn').className = 'hidden';
      document.getElementById('btnOOPOn').className = 'hidden';
      return this;
    },
    setToggles: function () {
      var goalfield = document.getElementById('fGoals');
      var goalon = document.getElementById('btnGoalsOn');
      var goaloff = document.getElementById('btnGoalsOff');
      var assfield = document.getElementById('fAss');
      var asson = document.getElementById('btnAssOn');
      var assoff = document.getElementById('btnAssOff');
      var g1field = document.getElementById('fG1');
      var g1on = document.getElementById('btnG1On');
      var g1off = document.getElementById('btnG1Off');
      var g2field = document.getElementById('fG2');
      var g2on = document.getElementById('btnG2On');
      var g2off = document.getElementById('btnG2Off');
      var g3field = document.getElementById('fG3');
      var g3on = document.getElementById('btnG3On');
      var g3off = document.getElementById('btnG3Off');
      var g4field = document.getElementById('fG4');
      var g4on = document.getElementById('btnG4On');
      var g4off = document.getElementById('btnG4Off');
      var g5field = document.getElementById('fG5');
      var g5on = document.getElementById('btnG5On');
      var g5off = document.getElementById('btnG5Off');
      var hTMLfield = document.getElementById('fHTML');
      var hTMLon = document.getElementById('btnHTMLOn');
      var hTMLoff = document.getElementById('btnHTMLOff');
      var cSSfield = document.getElementById('fCSS');
      var cSSon = document.getElementById('btnCSSOn');
      var cSSoff = document.getElementById('btnCSSOff');
      var jSfield = document.getElementById('fJS');
      var jSon = document.getElementById('btnJSOn');
      var jSoff = document.getElementById('btnJSOff');
      var gITfield = document.getElementById('fGIT');
      var gITon = document.getElementById('btnGITOn');
      var gIToff = document.getElementById('btnGITOff');
      var dSAfield = document.getElementById('fDSA');
      var dSAon = document.getElementById('btnDSAOn');
      var dSAoff = document.getElementById('btnDSAOff');
      var cMDfield = document.getElementById('fCMD');
      var cMDon = document.getElementById('btnCMDOn');
      var cMDoff = document.getElementById('btnCMDOff');
      var oOPfield = document.getElementById('fOOP');
      var oOPon = document.getElementById('btnOOPOn');
      var oOPoff = document.getElementById('btnOOPOff');

      assign(goalon, goaloff, goalfield);
      assign(asson, assoff, assfield);
      assign(g1on, g1off, g1field);
      assign(g2on, g2off, g2field);
      assign(g3on, g3off, g3field);
      assign(g4on, g4off, g4field);
      assign(g5on, g5off, g5field);
      assign(hTMLon, hTMLoff, hTMLfield);
      assign(cSSon, cSSoff, cSSfield);
      assign(jSon, jSoff, jSfield);
      assign(gITon, gIToff, gITfield);
      assign(dSAon, dSAoff, dSAfield);
      assign(cMDon, cMDoff, cMDfield);
      assign(oOPon, oOPoff, oOPfield);
      function assign(on, off, tform) {
        on.addEventListener('click', function () {
          off.className = 'toggle';
          on.className = 'hidden';
          tform.className = '';
        });
        off.addEventListener('click', function () {
          on.className = 'toggle';
          off.className = 'hidden';
          tform.className = 'hidden';
        });
      }

    },
    blankInput: function(inputClass){
      var blankThese = document.getElementsByClassName(inputClass);
      for (var i=0; i < blankThese.length; i++){
        blankThese[i].value = '';
      }
      return this;
    },
    hideMainButtons: function(){
      document.getElementById('btncreatepgp').className = 'hidden';
      document.getElementById('btnsurvey').className = 'hidden';
      document.getElementById('btnviewpgp').className = 'hidden';
      return this;
    },
    makeLoginView: function(){
    var dgView2 = document.getElementById('dgView2');
      var art = document.createElement('article');
      art.className = 'userLogin';
      var frm = document.createElement('form');
      frm.className = 'userLogin_form';
      var fs = document.createElement('fieldset');
var leg = document.createElement('legend');
var legtxt = document.createTextNode('User Login');
      leg.appendChild(legtxt);
      var lblemail = document.createElement('label');
      var lblemailtxt = document.createTextNode('Email/UserName');
      lblemail.appendChild(lblemailtxt);
      lblemail.className = 'loginUser_form-lbl';
    var email = document.createElement('input');
      email.className = 'loginUser_form-textarea';
    var pswd = document.createElement('input');
    var btnLogin2 = document.createElement('button');
      var btnTxt = document.createTextNode('SUBMIT');
      btnLogin2.appendChild(btnTxt);
      art.appendChild(frm);
      frm.appendChild(fs);
      fs.appendChild(leg);
      fs.appendChild(lblemail);
      fs.appendChild(email);
      fs.appendChild(pswd);
      frm.appendChild(btnLogin2);
     // dgView2.innerHTML = art;
      return this;
  },
    addTag: function(elId, tg, tgId, cls, tgHtml){
      var newTg = document.createElement(tg);
      newTg.id = tgId;
      newTg.className = cls || '';
      newTg.innerHTML = tgHtml || '';
      document.getElementById(elId).appendChild(newTg);
    },
    addTextTag: function(elId, tg, txt, cls){
      var par = document.createElement(tg);
      par.innerHTML = txt;
      par.className = cls || '';
      document.getElementById(elId).appendChild(par);
    },
    addInput: function(elId, tgId, placeTxt, tgtype){
      var i = document.createElement('input');
      i.id = tgId;
      i.placeholder = placeTxt;
      i.type = tgtype;
      document.getElementById(elId).appendChild(i);
    },
    addButton: function(elId, tgId, tgText, cls){
      var b = document.createElement('button');
      b.className = cls || '';
      b.id = tgId;
      b.innerHTML = tgText;
      b.type = 'button'; //this keeps the automatic page refresh from happening when used in a form
      document.getElementById(elId).appendChild(b);
    },
    addToggleButton: function(elId, tgId, tgText1, tgText2, cls, f1, f2){
      var b = document.createElement('button');
      b.className = cls || '';
      b.id = tgId;
      b.innerHTML = tgText1;
      b.type = 'button';
      var clicked = true;
      b.addEventListener('click', function(e){
        if(clicked){
          clicked = false;
          e.srcElement.innerHTML = tgText1;
          if(f1){
            f1();
          }
        }
        else{
          clicked = true;
          e.srcElement.innerHTML = tgText2;
          if(f2){
            f2();
          }
        }
      });
      document.getElementById(elId).appendChild(b);
    },
    addToggleViewButton: function(elId, tgId, tgTxt, cls, tglView){
      this.addToggleButton(elId, tgId, tgTxt, tgTxt, cls, function(){
        var fm = document.getElementById(tglView);
        document.getElementById(tgId).className = 'btnOff';
        fm.hidden = true;
      }, function(){
        var fm = document.getElementById(tglView);
        document.getElementById(tgId).className = 'btnOn';
        fm.hidden = false;
      });
    },
    addLabel: function(elId, lblFor, lblTxt){
      var l = document.createElement(('label'));
      l.htmlFor = lblFor;
      l.innerHTML = lblTxt;
      document.getElementById(elId).appendChild(l);
    },
    replaceClass: function(tgId, cls){
      document.getElementById(tgId).className = cls;
    }

  }
};

},{}],17:[function(require,module,exports){
/**
 * pgp
 * Created by dcorns on 3/25/15.
 */
'use strict';
var pgpMdl = {
  name: String,
  ta: String,
  student: String,
  course: String,
  rtg1: String,
  rtg2: String,
  rtg3: String,
  rtg4: String,
  rtg5: String,
  rtg6: String,
  rtg7: String,
  rtg1a: String,
  rtg2a: String,
  rtg3a: String,
  rtg4a: String,
  rtg5a: String,
  rtg6a: String,
  rtg7a: String,
  note: String,
  goal: String,
  goal2: String,
  goal3: String,
  goal4: String,
  goal5: String,
  goala: String,
  goal2a: String,
  goal3a: String,
  goal4a: String,
  goal5a: String,
  goalsrc1: [],
  goalsrc2: [],
  goalsrc3: [],
  goalsrc4: [],
  goalsrc5: [],
  rec1: String,
  rec2: String,
  rec3: String,
  rec4: String,
  rec5: String,
  rec6: String,
  rec7: String,
  recsrc1: [],
  recsrc2: [],
  recsrc3: [],
  recsrc4: [],
  recsrc5: [],
  recsrc6: [],
  recsrc7: [],
  moresrc: [],
  feedbk: String,
  preRtgComplete: Boolean,
  rtgComplete: Boolean,
  recComplete: Boolean,
  status: String
};
module.exports = function (app){
  app.pgpMdl = pgpMdl;
};
},{}],18:[function(require,module,exports){
/**
 * surveyModel
 * Created by dcorns on 3/13/15.
 */
'use strict';
var userMdl = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

module.exports = function (app){
  app.userMdl = userMdl;
};
},{}],19:[function(require,module,exports){
/**
 * createPgpView
 * Created by dcorns on 3/24/15.
 */
'use strict';

var ui = require('../js/ui');

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  var ca = document.getElementById('btncreateaccount');
  ca.className = 'hidden';
  var btnCreatePgp = document.getElementById('btncreatepgp');
  btnCreatePgp.className = 'nav_ul-li';
  document.getElementById('btnviewpgp').className = 'nav_ul-li';

  //main view
  document.getElementById('dgView').innerHTML = '';
  ux.addTag('dgView', 'Article', 'createPGP');

  ux.addTag('createPGP', 'form', 'createPGPForm');
  ux.addTag('createPGPForm', 'fieldset', 'createPGPSelect');
  ux.addTextTag('createPGPSelect', 'legend', 'Please Select A Student');
  ux.addTag('createPGPSelect', 'select', 'studentSelect');

  ux.addTextTag('createPGPForm', 'h2', 'Save New Resources Here');
  ux.addTag('createPGPForm', 'form', 'frmGoalResource');
  ux.addInput('frmGoalResource', 'resrcTitle', 'New Resource Title', 'text');
  ux.addInput('frmGoalResource', 'resrcDescription', 'New Resource Description', 'text');
  ux.addInput('frmGoalResource', 'resrcLink', 'New Resource Link', 'text');
  ux.addTag('frmGoalResource', 'form','chooseResourceTopics');
  ux.addTextTag('chooseResourceTopics', 'h3', 'Check all that apply to new Resource');
  ux.addButton('frmGoalResource', 'btnSaveResource', 'Save New Resource');

  ux.addToggleViewButton('createPGPForm', 'btnGoalsToggle', 'GOALS', 'btnOn', 'fGoals');
  ux.addTag('createPGPForm', 'fieldset', 'fGoals');
  ux.addTextTag('fGoals', 'legend', 'Goals');
  //ux.addTag('fGoals','div', 'addGenResource');

  ux.addToggleViewButton('fGoals', 'btnG1On', 'LongTermGoals', 'btnOn', 'fG1');
  ux.addTag('fGoals', 'fieldset', 'fG1');
  ux.addTextTag('fG1', 'label', 'My long term goals:', 'pgpQuestions');
  ux.addTag('fG1', 'p', 'preGoala', 'preSurvey', 'PreSurvey: ');
  ux.addTag('fG1', 'p', 'postGoala', 'postSurvey', 'PostSurvey');

  ux.addLabel('fG1', 'sG1', 'General Resources');
  ux.addTag('fG1', 'select', 'sG1');
  ux.addTextTag('fG1', 'label', 'Resource Blame: ');
  ux.addButton('fG1', 'addToPlan', 'Add Resource to Plan');
  ux.addTextTag('fG1', 'label', 'Remove from Plan: Alt+Click');
  ux.addTag('fG1', 'ul', 'goalAresources', 'resourceList');
};
},{"../js/ui":16}],20:[function(require,module,exports){
/**
 * homeView
 * Created by dcorns on 3/13/15.
 */
'use strict';

var ui = require('../js/ui');
module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  //Create View
  document.getElementById('dgView').innerHTML = '';
  var title = 'artHome';
  ux.addTag('dgView', 'article', title);
  ux.addTextTag(title, 'p', 'Congratulations, you\'ve made it to the end of our Foundations of CS and Web Development course! I truly hope it has been a rewarding experience for you, and encourage you to continue to spend as much time as you can honing and further developing your coding powers.');
  ux.addTextTag(title, 'p', 'To help us give you the best guidance on where to go from here, please tell us a little about how strongly you are feeling about the various topics we covered, and what your longer-term goals are. Your TA will share some feedback and favorite resources you can use to keep you learning on your own time.');
  ux.addTextTag(title, 'p', 'It\'s been a great honor to travel this stretch of the journey with you. I wish you the best with all that this path leads you towards!');
  ux.addTextTag(title, 'p', '—Brook');
};
},{"../js/ui":16}],21:[function(require,module,exports){
/**
 * loginView
 * Created by dcorns on 3/13/15.
 */
'use strict';
var ui = require('../js/ui');

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  document.getElementById('btncreateaccount').className = 'nav_ul-li-a';
  //Create View
  document.getElementById('dgView').innerHTML = '';
  ux.addTag('dgView', 'Article', 'loginHome');
  ux.addTag('loginHome', 'form', 'loginForm');
  ux.addTag('loginForm', 'fieldset', 'loginField');
  ux.addTextTag('loginField', 'legend', 'User Login');
  ux.addTextTag('loginField', 'label', 'Email Address');
  ux.addInput('loginField', 'username', 'enter email address', 'email');
  ux.addTextTag('loginField', 'label', 'Password');
  ux.addInput('loginField', 'password', 'enter password', 'password');
  ux.addButton('loginForm', 'btnLogin', 'SUBMIT');
  ux.replaceClass('loginForm', 'userLogin_form');
};
},{"../js/ui":16}]},{},[8,9,10,11,12,13,14,15,16]);