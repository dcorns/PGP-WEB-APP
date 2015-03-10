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
  //Handle Refresh by checking session storage for last href and redirecting if it exists
  var lastHref = window.sessionStorage.getItem('href');
  if (lastHref){
    postOffice(lastHref);
  }
  else{//load home template
    lastHref = '#/home';
    window.sessionStorage.setItem('href', lastHref);
    window.history.pushState(null, null, lastHref);
    postOffice(lastHref);
  }
  //Add event handlers for 'a' tags
  var links = document.getElementsByTagName('a');
  var idx = 0, ln = links.length;
  for(idx; idx < ln; idx++){
    links[idx].addEventListener('click', function(e){
      window.sessionStorage.setItem('href', this.href);
      window.history.pushState(null, null, this.href);
      e.preventDefault();
      postOffice(this.href);
    });
  }
  //Add front and back button handler
  window.addEventListener('popstate', function(){
    window.sessionStorage.setItem('href', location.href);
    postOffice(location.href);
  });

}

function postOffice(dgRoute){
  //grab the '#' and everything that follows it.
  dgRoute = dgRoute.substr(dgRoute.indexOf('#'));
  switch(dgRoute) {
    case '#/student_survey':
      return rp({
        templateUrl: 'views/student_survey.html',
        controller: surveyCtrl
      });
      break;
    case '#/create_PGP':
      return rp({
        templateUrl: 'views/create_PGP.html',
        controller: pgpsCtrl
      });
      break;
    case '#/preview_PGP':
      return rp({
        templateUrl: 'views/preview_PGP.html',
        controller: pgpsCtrl
      });
      break;
    case '#/view_PGP':
      return rp({
        templateUrl: 'views/view_PGP.html',
        controller: viewPGPCtrl
      });
      break;
    case '#/create_Account':
      return rp({
        templateUrl: 'views/create_Account.html',
        controller: userCtrl
      });
      break;
    case '#/login':
      return rp({
        templateUrl: 'views/login.html',
        controller: userCtrl
      });
      break;
    case '#/home':
      return rp({
        templateUrl: 'views/home.html',
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