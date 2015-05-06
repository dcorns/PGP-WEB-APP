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