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