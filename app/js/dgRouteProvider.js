/**
 * dgRouteProvider
 * Created by dcorns on 3/6/15.
 * Handles client routing and the script/controller that is used for each route
 */
'use strict';

function loadRoute(rtObj){
  document.getElementById("dgView").innerHTML='<object type="text/html" data=' + rtObj.templateUrl + '></object>';
  rtObj.controller(); rtObj.view(); rtObj.model();
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
          controller: app.surveyCtrl,
          model: function(){}
        });
        break;
      case '#/create_PGP':
        return loadRoute({
          templateUrl: 'views/create_PGP.html',
          view: function(){},
          controller: app.createPGPCtrl,
          model: function(){}
        });
        break;
      case '#/preview_PGP':
        return loadRoute({
          templateUrl: 'views/preview_PGP.html',
          view: function(){},
          controller: app.previewPGPCtrl,
          model: function(){}
        });
        break;
      case '#/view_PGP':
        return loadRoute({
          templateUrl: 'views/view_PGP.html',
          view: function(){},
          controller: app.viewPGPCtrl,
          model: function(){}
        });
        break;
      case '#/create_Account':
        return loadRoute({
          templateUrl: 'views/create_Account.html',
          view: function(){},
          controller: app.createAccountCtrl,
          model: function(){}
        });
        break;
      case '#/login':
        return loadRoute({
          templateUrl: 'views/login.html',
          view: function(){},
          controller: app.loginCtrl,
          model: function(){}
        });
        break;
      case '#/home':
        return loadRoute({
          templateUrl: 'views/home.html',
          view: function(){},
          controller: app.homeCtrl,
          model: function(){}
        });
        break;
      default:
        return loadRoute({
          templateUrl: 'views/home.html',
          view: function(){},
          controller: app.homeCtrl,
          model: function(){}
        });
        break;
    }

};

};