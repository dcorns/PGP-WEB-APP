'use strict';
var dgApp = {};
dgApp.userCtrl = require('../controllers/userController');
dgApp.surveyCtrl = require('../controllers/surveyController');
dgApp.pgpsCtrl = require('../controllers/pgpsController');
dgApp.viewPGPCtrl = require('../controllers/viewPGPController');
require('../js/dgRouteProvider')(dgApp); //adds loadRoute method to dgApp

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
    dgApp.loadRoute(lastHref);
  }
  else{//load home template
    lastHref = '#/home';
    window.sessionStorage.setItem('href', lastHref);
    window.history.pushState(null, null, lastHref);
    dgApp.loadRoute(lastHref);
  }
  //Add event handlers for 'a' tags
  var links = document.getElementsByTagName('a');
  var idx = 0, ln = links.length;
  for(idx; idx < ln; idx++){
    links[idx].addEventListener('click', function(e){
      window.sessionStorage.setItem('href', this.href);
      window.history.pushState(null, null, this.href);
      e.preventDefault();
      dgApp.loadRoute(this.href);
    });
  }
  //Add front and back button handler
  window.addEventListener('popstate', function(){
    window.sessionStorage.setItem('href', location.href);
    dgApp.loadRoute(location.href);
  });

}

startdgApp(firstDo);