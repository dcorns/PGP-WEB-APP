/**
 * createPgpView
 * Created by dcorns on 3/24/15.
 */
'use strict';

var ui = require('../js/ui');

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  var ca = document.getElementById('btncreateaccount');
  ca.className = 'hidden';
  var btnCreatePgp = document.getElementById('btncreatepgp');
  btnCreatePgp.className = 'nav_ul-li';
  document.getElementById('btnviewpgp').className = 'nav_ul-li';

  document.getElementById('dgView').innerHTML = '';
  ux.addTag('dgView', 'Article', 'createPGP');
  ux.addTag('createPGP', 'form', 'createPGPForm');
  ux.addTag('createPGPForm', 'fieldset', 'createPGPSelect');
  ux.addTextTag('createPGPSelect', 'legend', 'Please Select A Student');
  ux.addTag('createPGPSelect', 'select', 'studentSelect');
  ux.addToggleViewButton('createPGPForm', 'btnGoalsToggle', 'GOALS', 'btnOn', 'fGoals');
  ux.addTag('createPGPForm', 'fieldset', 'fGoals');
  ux.addTextTag('fGoals', 'legend', 'Goals');
  ux.addTextTag('fGoals', 'h2', 'Save New General Resources Here');
  ux.addTag('fGoals','div', 'addGenResource');
  ux.addTag('addGenResource', 'form', 'frmGoalResource');
  ux.addInput('frmGoalResource', 'resrcTitle', 'New Resource Title', 'text');
  ux.addInput('frmGoalResource', 'resrcType', 'New Resource Type', 'text');
  ux.addInput('frmGoalResource', 'resrcLink', 'New Resource Link', 'text');
  ux.addButton('frmGoalResource', 'btnSaveResource', 'Save New Resource');
  ux.addButton('fGoals','btnG1On', 'LongTermGoals', 'toggle');
  ux.addTag('fGoals', 'fieldset', 'fG1');
};