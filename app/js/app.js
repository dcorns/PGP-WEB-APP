'use strict';
//comment for changes

var rp = require('../js/dgRouteProvider');

var surveyCtrl = require('../controllers/surveyController');
var pgpsCtrl = require('../controllers/pgpsController');
var userCtrl = require('../controllers/userController');
var viewPGPCtrl = require('../controllers/viewPGPController');

function startdgApp(startup){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = startup;
  }
  else{
    window.onload = function() {
      preOnload();
      startup();
    }
  }
}

function firstDo(){
  //Add event handlers for 'a' tags
  var links = document.getElementsByTagName('a');
  var idx = 0, ln = links.length;
  for(idx; idx < ln; idx++){
    links[idx].addEventListener('click', function(){
      postOffice(this.href);
    });
  }

}

function postOffice(dgRoute){
  //grab everything that follows the #
  dgRoute = dgRoute.substr(dgRoute.indexOf('#')+1);
  switch(dgRoute) {
    case '/student_survey':
      return rp({
        templateUrl: 'views/student_survey.html',
        controller: surveyCtrl
      });
      break;
    case '/create_PGP':
      return rp({
        templateUrl: 'views/create_PGP.html',
        controller: pgpsCtrl
      });
      break;
    case '/preview_PGP':
      return rp({
        templateUrl: 'views/preview_PGP.html',
        controller: pgpsCtrl
      });
      break;
    case '/view_PGP':
      return rp({
        templateUrl: 'views/view_PGP.html',
        controller: viewPGPCtrl
      });
      break;
    case '/create_Account':
      return rp({
        templateUrl: 'views/create_Account.html',
        controller: userCtrl
      });
      break;
    case '/login':
      return rp({
        templateUrl: 'views/login.html',
        controller: userCtrl
      });
      break;
    default:
      return rp({
        templateUrl: 'views/home.html',
        controller: userCtrl
      });
      break;
  }
}

startdgApp(firstDo);