/**
 * Created by dcorns on 10/7/14.
 */
'use strict';
module.exports = function () {
  return {
    fillInput: function (id, val) {
      if (document.getElementById(id)) {
        console.log(id + ',' + val);
        document.getElementById(id).value = val || "";
        return this;
      }
    },
    startHidden: function () {
      this.hideMainButtons();
      document.getElementById('btnGoalsOn').className = 'hidden';
      document.getElementById('btnAssOn').className = 'hidden';
      document.getElementById('btnG1On').className = 'hidden';
      document.getElementById('btnG2On').className = 'hidden';
      document.getElementById('btnG3On').className = 'hidden';
      document.getElementById('btnG4On').className = 'hidden';
      document.getElementById('btnG5On').className = 'hidden';
      document.getElementById('btnHTMLOn').className = 'hidden';
      document.getElementById('btnCSSOn').className = 'hidden';
      document.getElementById('btnJSOn').className = 'hidden';
      document.getElementById('btnGITOn').className = 'hidden';
      document.getElementById('btnDSAOn').className = 'hidden';
      document.getElementById('btnCMDOn').className = 'hidden';
      document.getElementById('btnOOPOn').className = 'hidden';
      return this;
    },
    setToggles: function () {
      var goalfield = document.getElementById('fGoals');
      var goalon = document.getElementById('btnGoalsOn');
      var goaloff = document.getElementById('btnGoalsOff');
      var assfield = document.getElementById('fAss');
      var asson = document.getElementById('btnAssOn');
      var assoff = document.getElementById('btnAssOff');
      var g1field = document.getElementById('fG1');
      var g1on = document.getElementById('btnG1On');
      var g1off = document.getElementById('btnG1Off');
      var g2field = document.getElementById('fG2');
      var g2on = document.getElementById('btnG2On');
      var g2off = document.getElementById('btnG2Off');
      var g3field = document.getElementById('fG3');
      var g3on = document.getElementById('btnG3On');
      var g3off = document.getElementById('btnG3Off');
      var g4field = document.getElementById('fG4');
      var g4on = document.getElementById('btnG4On');
      var g4off = document.getElementById('btnG4Off');
      var g5field = document.getElementById('fG5');
      var g5on = document.getElementById('btnG5On');
      var g5off = document.getElementById('btnG5Off');
      var hTMLfield = document.getElementById('fHTML');
      var hTMLon = document.getElementById('btnHTMLOn');
      var hTMLoff = document.getElementById('btnHTMLOff');
      var cSSfield = document.getElementById('fCSS');
      var cSSon = document.getElementById('btnCSSOn');
      var cSSoff = document.getElementById('btnCSSOff');
      var jSfield = document.getElementById('fJS');
      var jSon = document.getElementById('btnJSOn');
      var jSoff = document.getElementById('btnJSOff');
      var gITfield = document.getElementById('fGIT');
      var gITon = document.getElementById('btnGITOn');
      var gIToff = document.getElementById('btnGITOff');
      var dSAfield = document.getElementById('fDSA');
      var dSAon = document.getElementById('btnDSAOn');
      var dSAoff = document.getElementById('btnDSAOff');
      var cMDfield = document.getElementById('fCMD');
      var cMDon = document.getElementById('btnCMDOn');
      var cMDoff = document.getElementById('btnCMDOff');
      var oOPfield = document.getElementById('fOOP');
      var oOPon = document.getElementById('btnOOPOn');
      var oOPoff = document.getElementById('btnOOPOff');

      assign(goalon, goaloff, goalfield);
      assign(asson, assoff, assfield);
      assign(g1on, g1off, g1field);
      assign(g2on, g2off, g2field);
      assign(g3on, g3off, g3field);
      assign(g4on, g4off, g4field);
      assign(g5on, g5off, g5field);
      assign(hTMLon, hTMLoff, hTMLfield);
      assign(cSSon, cSSoff, cSSfield);
      assign(jSon, jSoff, jSfield);
      assign(gITon, gIToff, gITfield);
      assign(dSAon, dSAoff, dSAfield);
      assign(cMDon, cMDoff, cMDfield);
      assign(oOPon, oOPoff, oOPfield);
      function assign(on, off, tform) {
        on.addEventListener('click', function () {
          off.className = 'toggle';
          on.className = 'hidden';
          tform.className = '';
        });
        off.addEventListener('click', function () {
          on.className = 'toggle';
          off.className = 'hidden';
          tform.className = 'hidden';
        });
      }

    },
    blankInput: function(inputClass){
      var blankThese = document.getElementsByClassName(inputClass);
      for (var i=0; i < blankThese.length; i++){
        blankThese[i].value = '';
      }
      return this;
    },
    hideMainButtons: function(){
      document.getElementById('btncreatepgp').className = 'hidden';
      document.getElementById('btnsurvey').className = 'hidden';
      document.getElementById('btnviewpgp').className = 'hidden';
      return this;
    },
    makeLoginView: function(){
    var dgView2 = document.getElementById('dgView2');
      var art = document.createElement('article');
      art.className = 'userLogin';
      var frm = document.createElement('form');
      frm.className = 'userLogin_form';
      var fs = document.createElement('fieldset');
var leg = document.createElement('legend');
var legtxt = document.createTextNode('User Login');
      leg.appendChild(legtxt);
      var lblemail = document.createElement('label');
      var lblemailtxt = document.createTextNode('Email/UserName');
      lblemail.appendChild(lblemailtxt);
      lblemail.className = 'loginUser_form-lbl';
    var email = document.createElement('input');
      email.className = 'loginUser_form-textarea';
    var pswd = document.createElement('input');
    var btnLogin2 = document.createElement('button');
      var btnTxt = document.createTextNode('SUBMIT');
      btnLogin2.appendChild(btnTxt);
      art.appendChild(frm);
      frm.appendChild(fs);
      fs.appendChild(leg);
      fs.appendChild(lblemail);
      fs.appendChild(email);
      fs.appendChild(pswd);
      frm.appendChild(btnLogin2);
     // dgView2.innerHTML = art;
      return this;
  },
    addTag: function(elId, tg, tgId){
      var newTg = document.createElement(tg);
      newTg.id = tgId;
      document.getElementById(elId).appendChild(newTg);
    },
    addTextTag: function(elId, tg, txt){
      var par = document.createElement(tg);
      par.innerHTML = txt;
      document.getElementById(elId).appendChild(par);
    },
    addInput: function(elId, tgId, placeTxt, tgtype){
      var i = document.createElement('input');
      i.id = tgId;
      i.placeholder = placeTxt;
      i.type = tgtype;
      document.getElementById(elId).appendChild(i);
    },
    addButton: function(elId, tgId, tgText){
      var b = document.createElement('button');
      b.id = tgId;
      b.innerHTML = tgText;
      b.type = 'button'; //this keeps the automatic page refresh from happening when used in a form
      document.getElementById(elId).appendChild(b);
    },
    replaceClass: function(tgId, cls){
      document.getElementById(tgId).className = cls;
    }

  }
};
