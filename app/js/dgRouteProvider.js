/**
 * dgRouteProvider
 * Created by dcorns on 3/6/15.
 * Handles client routing and the script/controller that is used for each route
 */
'use strict';

function loadRoute(rtObj){
  document.getElementById("dgView").innerHTML='<object type="text/html" data=' + rtObj.templateUrl + '></object>';
  rtObj.controller();
}

module.exports = function(app){
  app.loadRoute = function(dgRoute){
    //grab the '#' and everything that follows it.
    dgRoute = dgRoute.substr(dgRoute.indexOf('#'));
    switch(dgRoute) {
      case '#/student_survey':
        return loadRoute({
          templateUrl: 'views/student_survey.html',
          controller: app.surveyCtrl
        });
        break;
      case '#/create_PGP':
        return loadRoute({
          templateUrl: 'views/create_PGP.html',
          controller: app.pgpsCtrl
        });
        break;
      case '#/preview_PGP':
        return loadRoute({
          templateUrl: 'views/preview_PGP.html',
          controller: app.pgpsCtrl
        });
        break;
      case '#/view_PGP':
        return loadRoute({
          templateUrl: 'views/view_PGP.html',
          controller: app.viewPGPCtrl
        });
        break;
      case '#/create_Account':
        return loadRoute({
          templateUrl: 'views/create_Account.html',
          controller: app.userCtrl
        });
        break;
      case '#/login':
        return loadRoute({
          templateUrl: 'views/login.html',
          controller: app.userCtrl
        });
        break;
      case '#/home':
        return loadRoute({
          templateUrl: 'views/home.html',
          controller: app.userCtrl
        });
        break;
      default:
        return loadRoute({
          templateUrl: 'views/home.html',
          controller: app.userCtrl
        });
        break;
    }

};

};