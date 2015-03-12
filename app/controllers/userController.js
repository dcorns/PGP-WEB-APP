/**
 * userController
 * Created by dcorns on 3/9/15.
 */
'use strict';

module.exports = function(){
  //var userLogin = function() {
  //  var storage = window.sessionStorage;
  //  storage.removeItem('token');
  //  $http.post('api/v_0_0_1/login', loginUser)
  //    .success(function(data) {
  //      //Save token in local storage
  //      storage.setItem('token', data.user.atoken);
  //      var ca = document.getElementById('btncreateaccount');
  //      ca.className = 'hidden';
  //      var roll = data.user.roll,
  //        btnSurvey = document.getElementById('btnsurvey'),
  //        btnCreatePgp = document.getElementById('btncreatepgp');
  //      if(roll === 'ta' || roll === 'admin'){
  //        btnSurvey.className = 'hidden';
  //        btnCreatePgp.className = 'nav_ul-li';
  //        document.getElementById('btnviewpgp').className = 'nav_ul-li';
  //        postOffice('#/create_PGP');
  //      }
  //      else{
  //        if(roll === 'student'){
  //          btnCreatePgp.className = 'hidden';
  //          btnSurvey.className = 'nav_ul-li';
  //          //Save note to local storage
  //          var sessionNote = SOS(data.note);
  //          sessionNote.saveNote();
  //          if(data.note.recComplete) window.location='/#/view_PGP';
  //          else window.location='/#/student_survey';
  //        }
  //      }
  //
  //    })
  //
  //    .error(function(data) {
  //      var handleError = handleErrors();
  //      handleError.alertObject(data);
  //    });
  //};
};