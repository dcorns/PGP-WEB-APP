'use strict';
var dgApp = {};
dgApp.homeCtrl = require('../controllers/homeController');
dgApp.loginCtrl = require('../controllers/loginController');
dgApp.createAccountCtrl = require('../controllers/createAccountController');
dgApp.surveyCtrl = require('../controllers/surveyController');
dgApp.createPGPCtrl = require('../controllers/createPGPcontroller');
dgApp.previewPGPCtrl = require('../controllers/previewPGPcontroller');
dgApp.viewPGPCtrl = require('../controllers/viewPGPcontroller');

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