/**
 * loginController
 * Created by dcorns on 3/12/15.
 */
'use strict';
var ui = require('../js/ui');
module.exports = function(){
  var loginUser = {email: '', password: ''};
  var ux = ui();
  ux.hideMainButtons();

  function userLogin() {
    var storage = window.sessionStorage;
    storage.removeItem('token');
    var ajaxReq = new XMLHttpRequest();
    ajaxReq.send('POST', 'api/v_0_0_1/login', true)
    $http.post('api/v_0_0_1/login', loginUser)
      .success(function(data) {
        //Save token in local storage
        storage.setItem('token', data.user.atoken);
        var ca = document.getElementById('btncreateaccount');
        ca.className = 'hidden';
        var roll = data.user.roll,
          btnSurvey = document.getElementById('btnsurvey'),
          btnCreatePgp = document.getElementById('btncreatepgp');
        if(roll === 'ta' || roll === 'admin'){
          btnSurvey.className = 'hidden';
          btnCreatePgp.className = 'nav_ul-li';
          document.getElementById('btnviewpgp').className = 'nav_ul-li';
          window.location="/#/create_PGP";
        }
        else{
          if(roll === 'student'){
            btnCreatePgp.className = 'hidden';
            btnSurvey.className = 'nav_ul-li';
            //Save note to local storage
            var sessionNote = SOS(data.note);
            sessionNote.saveNote();
            if(data.note.recComplete) window.location='/#/view_PGP';
            else window.location='/#/student_survey';
          }
        }

      })

      .error(function(data) {
        var handleError = handleErrors();
        handleError.alertObject(data);
      });
  };

};