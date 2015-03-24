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