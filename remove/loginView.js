/**
 * loginView
 * Created by dcorns on 3/13/15.
 */
'use strict';
var ui = require('../js/ui');

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  document.getElementById('btncreateaccount').className = 'nav_ul-li-a';
  //Create View
  document.getElementById('dgView').innerHTML = '';
  ux.addTag('dgView', 'Article', 'loginHome');
  ux.addTag('loginHome', 'form', 'loginForm');
  ux.addTag('loginForm', 'fieldset', 'loginField');
  ux.addTextTag('loginField', 'legend', 'User Login');
  ux.addTextTag('loginField', 'label', 'Email Address');
  ux.addInput('loginField', 'username', 'enter email address', 'email');
  ux.addTextTag('loginField', 'label', 'Password');
  ux.addInput('loginField', 'password', 'enter password', 'password');
  ux.addButton('loginForm', 'btnLogin', 'SUBMIT');
  ux.replaceClass('loginForm', 'userLogin_form');
};