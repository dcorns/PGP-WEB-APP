/**
 * createPgpView
 * Created by dcorns on 3/24/15.
 */
'use strict';

var ui = require('../js/ui');

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  document.getElementById('dgView').innerHTML = '';
  var ca = document.getElementById('btncreateaccount');
  ca.className = 'hidden';
  var btnCreatePgp = document.getElementById('btncreatepgp');
  btnCreatePgp.className = 'nav_ul-li';
  document.getElementById('btnviewpgp').className = 'nav_ul-li';
};