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