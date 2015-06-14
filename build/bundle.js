(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var dgApp = {};
//dgApp.homeView = require('../views/homeView');
//dgApp.homeCtrl = require('../controllers/homeController');
//dgApp.loginView = require('../views/loginView');
//dgApp.loginCtrl = require('../controllers/loginController');
//dgApp.createAccountCtrl = require('../controllers/createAccountController');
//dgApp.surveyCtrl = require('../controllers/surveyController');
//dgApp.createPgpView = require('../views/createPgpView');
//dgApp.createPGPCtrl = require('../controllers/createPGPcontroller');
//dgApp.previewPGPCtrl = require('../controllers/previewPGPcontroller');
//dgApp.viewPGPCtrl = require('../controllers/viewPGPcontroller');

require('../models/userModel')(dgApp); //adds userMdl object
require('../models/pgpModel')(dgApp); //adds pgpMdl object
//require('../js/dgRouteProvider')(dgApp); //adds loadRoute method to dgApp
require('../js/dgMethods')(dgApp); //add dgMethod object to dgApp
require('../js/clientValidation')(dgApp); //add client validation
require('../js/dgComponents')(dgApp); //add web components

var views = require('./build/views');
var controllers = require('./controllers/controllerRegistry')();
var route = require('./router')(views, controllers);

function firstDo(){
  window.dgApp = dgApp;
  //Handle Refresh by checking session storage for last href and redirecting if it exists
  var lastHref = window.sessionStorage.getItem('href');
  var netAction = window.sessionStorage.getItem('netAction');
    if (lastHref) {
      //dgApp.loadRoute(lastHref);
      route(lastHref);
    }
    else {//load home template
      lastHref = '#/home';
      window.sessionStorage.setItem('href', lastHref);
      window.history.pushState(null, null, lastHref);
      //dgApp.loadRoute(lastHref);
      route(lastHref);
    }
    //Add event handlers for 'a' tags
    var links = document.getElementsByTagName('a');
    var idx = 0, ln = links.length;
    for (idx; idx < ln; idx++) {
      links[idx].addEventListener('click', function (e) {
        window.sessionStorage.setItem('href', this.href);
        window.history.pushState(null, null, this.href);
        e.preventDefault();
        route(this.href);
      });
    }
    //Add front and back button handler
    window.addEventListener('popstate', function () {
      window.sessionStorage.setItem('href', location.href);
      route(location.href);
    });
}

dgApp.dgMethod.winReady(firstDo);
},{"../js/clientValidation":3,"../js/dgComponents":8,"../js/dgMethods":9,"../models/pgpModel":16,"../models/userModel":17,"./build/views":2,"./controllers/controllerRegistry":4,"./router":13}],2:[function(require,module,exports){
'use strict';
module.exports = {"create_Account":"<div data-ng-controller=\"userController\">\n    <article class=\"newUser\">\n        <form class=\"newUser_form\">\n            <fieldset>\n                <legend>New User Information</legend>\n                <div>\n                    <label class=\"newUser_form-lbl\">Email Address</label>\n                    <input class=\"newUser_form-textarea\" type=\"email\" placeholder=\"Email for User Name\"\n                           data-ng-model=\"newUser.email\">\n                </div>\n\n                <div>\n                    <label class=\"newUser_form-lbl\">Password</label>\n                    <input type=\"password\" placeholder=\"Choose password\" data-ng-model=\"newUser.password\">\n                </div>\n\n                <div>\n                    <label class=\"newUser_form-lbl\">First Name</label>\n                    <input type=\"text\" placeholder=\"First name?\" class=\"newUser_form-textarea\"\n                           data-ng-model=\"newUser.firstName\">\n                </div>\n\n                <div>\n                    <label class=\"newUser_form-lbl\">Last Name</label>\n                    <input type=\"text\" placeholder=\"Last name?\" class=\"newUser_form-textarea\"\n                           data-ng-model=\"newUser.lastName\">\n                </div>\n            </fieldset>\n            <button data-ng-click=\"saveNewUser(selectedUser)\">Create</button>\n        </form>\n    </article>\n</div>\n","create_PGP":"\n    <select id=\"studentSelect\"></select>\n\n    <section id=\"addResources\">\n        <h2 id=\"saveGenResHere\">Save New Resources Here</h2>\n\n                <input class=\"rGeneral\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveGResource.resource.title\">\n                <input class=\"rGeneral\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveGResource.resource.type\">\n                <input class=\"rGeneral\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveGResource.resource.rlink\">\n        <section id=\"rTypes\"></section><!--populated with checkboxes by controller-->\n        <button id=\"btnSaveNewResource\">Save New Resource</button>\n        <select id=\"resources2\"></select>\n        <super-select id=\"resources\" data-items=\"pgpResources\" data-filters=\"pgpTopics\" data-titles=\"titles\"></super-select>\n    </section>\n\n\n<button class=\"toggle\" id=\"btnGoalsOn\">GOALS</button>\n<!--Goal Resources ***************************************************************************-->\n<fieldset id=\"fGoals\">\n    <button class=\"toggle\" id=\"btnGoalsOff\">GOALS</button>\n    <legend>Goals</legend>\n\n\n\n    <!--Goals input ************************************************************************************-->\n    <button id=\"btnG1On\" class=\"toggle\">LongTermGoals</button>\n    <fieldset id=\"fG1\">\n        <button id=\"btnG1Off\" class=\"toggle\">LongTermGoals</button>\n        <label class=\"pgpQuestions\">My long term goals:</label>\n\n        <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.goal}}</p>\n        <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.goala}}</p>\n\n        <label>Resource Blame:</label> {{selectedG1Res.name}}\n        <button data-ng-click=\"addResource(selectedG1Res, selectedPgp.goalsrc1)\">ADD Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.goalsrc1)\"\n                data-ng-repeat=\"rec in selectedPgp.goalsrc1\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n    </fieldset>\n\n    <button id=\"btnG2On\" class=\"toggle\">REASONS</button>\n    <fieldset id=\"fG2\">\n        <button id=\"btnG2Off\" class=\"toggle\">REASONS</button>\n        <label class=\"pgpQuestions\">Reasons for my interest in developing computer/coding skills:</label>\n\n        <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.goal2}}</p>\n        <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.goal2a}}</p>\n        <label for=\"sG2\">General Resources</label>\n        <select id=\"sG2\" data-ng-model=\"selectedG2Res\" data-ng-options=\"r.title for r in genResources\" data-ng-click=\"removeResource($event, selectedG2Res, genResources, 'General')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedG2Res.name}}\n        <button data-ng-click=\"addResource(selectedG2Res, selectedPgp.goalsrc2)\">ADD Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.goalsrc2)\"\n                data-ng-repeat=\"rec in selectedPgp.goalsrc2\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n    </fieldset>\n\n    <button id=\"btnG3On\" class=\"toggle\">LikeProblems</button>\n    <fieldset id=\"fG3\">\n        <button id=\"btnG3Off\" class=\"toggle\">LikeProblems</button>\n        <label class=\"pgpQuestions\">I like working on these kinds of problems:</label>\n\n        <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.goal3}}</p>\n        <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.goal3a}}</p>\n        <label for=\"sG3\">General Resources</label>\n        <select id=\"sG3\" data-ng-model=\"selectedG3Res\" data-ng-options=\"r.title for r in genResources\" data-ng-click=\"removeResource($event, selectedG3Res, genResources, 'General')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedG3Res.name}}\n        <button data-ng-click=\"addResource(selectedG3Res, selectedPgp.goalsrc3)\">ADD Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.goalsrc3)\"\n                data-ng-repeat=\"rec in selectedPgp.goalsrc3\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n    </fieldset>\n\n    <button id=\"btnG4On\" class=\"toggle\">WhatNext</button>\n    <fieldset id=\"fG4\">\n        <button id=\"btnG4Off\" class=\"toggle\">WhatNext</button>\n        <label class=\"pgpQuestions\">What I would like to do next:</label>\n\n        <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.goal4}}</p>\n        <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.goal4a}}</p>\n        <label for=\"sG4\">General Resources</label>\n        <select id=\"sG4\" data-ng-model=\"selectedG4Res\" data-ng-options=\"r.title for r in genResources\" data-ng-click=\"removeResource($event, selectedG4Res, genResources, 'General')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedG4Res.name}}\n        <button data-ng-click=\"addResource(selectedG4Res, selectedPgp.goalsrc4)\">ADD Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.goalsrc4)\"\n                data-ng-repeat=\"rec in selectedPgp.goalsrc4\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n    </fieldset>\n\n    <button id=\"btnG5On\" class=\"toggle\">ACCOMPLISH</button>\n    <fieldset id=\"fG5\">\n        <button id=\"btnG5Off\" class=\"toggle\">ACCOMPLISH</button>\n        <label class=\"pgpQuestions\">>What I would like to be able to accomplish with code:</label>\n\n        <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.goal5}}</p>\n        <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.goal5a}}</p>\n        <label for=\"sG5\">General Resources</label>\n        <select id=\"sG5\" data-ng-model=\"selectedG5Res\" data-ng-options=\"r.title for r in genResources\" data-ng-click=\"removeResource($event, selectedG5Res, genResources, 'General')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedG5Res.name}}\n        <button data-ng-click=\"addResource(selectedG5Res, selectedPgp.goalsrc5)\">ADD Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.goalsrc5)\"\n                data-ng-repeat=\"rec in selectedPgp.goalsrc5\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n    </fieldset>\n\n</fieldset>\n\n<!--Self Assessment ********************************************************************************************-->\n<button class=\"toggle\" id=\"btnAssOn\">ASSESSMENT</button>\n<fieldset id=\"fAss\">\n    <button class=\"toggle\" id=\"btnAssOff\">ASSESSMENT</button>\n    <legend>Student's Skill Assessment By Topic</legend>\n\n    <button id=\"btnHTMLOn\" class=\"toggle\">HTML</button>\n    <fieldset id=\"fHTML\">\n        <button id=\"btnHTMLOff\" class=\"toggle\">HTML</button>\n        <label class=\"newSurvey_form-lbl\">HTML:</label>\n\n        <form id=\"frmHTMLResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg1}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg1a}}</label>\n            <input class=\"rHtml\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveHTMLResource.resource.title\">\n            <input class=\"rHtml\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveHTMLResource.resource.type\">\n            <input class=\"rHtml\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveHTMLResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveHTMLResource, HTMLResources, 'HTML', 'rHtml')\">Save New HTML resource</button>\n        </form>\n        <label for=\"sHTML\">HTML Resources</label>\n        <select id=\"sHTML\" data-ng-model=\"selectedHTMLRes\" data-ng-options=\"r.title for r in HTMLResources\" data-ng-click=\"removeResource($event, selectedHTMLRes, HTMLResources, 'HTML')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedHTMLRes.name}}\n        <button data-ng-click=\"addResource(selectedHTMLRes, selectedPgp.recsrc1)\">ADD HTML Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc1)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc1\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" class=\"newSurvey_form-textarea\" placeholder=\"Please enter recommendations here\"\n                  data-ng-model=\"selectedPgp.rec1\"></textarea>\n    </fieldset>\n\n    <button id=\"btnCSSOn\" class=\"toggle\">CSS</button>\n    <fieldset id=\"fCSS\">\n        <button id=\"btnCSSOff\" class=\"toggle\">CSS</button>\n        <label class=\"newSurvey_form-lbl\">CSS:</label>\n\n        <form id=\"frmCSSResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg2}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg2a}}</label>\n            <input class = \"rCss\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveCSSResource.resource.title\">\n            <input class=\"rCss\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveCSSResource.resource.type\">\n            <input class=\"rCss\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveCSSResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveCSSResource, CSSResources, 'CSS', 'rCss')\">Save New CSS Resource</button>\n        </form>\n        <label for=\"sCSS\">CSS Resources</label>\n        <select id=\"sCSS\" data-ng-model=\"selectedCSSRes\" data-ng-options=\"r.title for r in CSSResources\" data-ng-click=\"removeResource($event, selectedCSSRes, CSSResources, 'CSS')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedCSSRes.name}}\n        <button data-ng-click=\"addResource(selectedCSSRes, selectedPgp.recsrc2)\">ADD CSS Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc2)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc2\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec2\"></textarea>\n    </fieldset>\n\n    <button id=\"btnJSOn\" class=\"toggle\">JavaScript</button>\n    <fieldset id=\"fJS\">\n        <button id=\"btnJSOff\" class=\"toggle\">JavaScript</button>\n        <label class=\"newSurvey_form-lbl\">Javascript:</label>\n\n        <form id=\"frmJSResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg3}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg3a}}</label>\n            <input class=\"rJs\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveJSResource.resource.title\">\n            <input class=\"rJs\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveJSResource.resource.type\">\n            <input class=\"rJs\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveJSResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveJSResource, JSResources, 'JS', 'rJs')\">Save New JS resource</button>\n        </form>\n        <label for=\"sJS\">JavaSript Resources</label>\n        <select id=\"sJS\" data-ng-model=\"selectedJSRes\" data-ng-options=\"r.title for r in JSResources\" data-ng-click=\"removeResource($event, selectedJSRes, JSResources, 'JS')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedJSRes.name}}\n        <button data-ng-click=\"addResource(selectedJSRes, selectedPgp.recsrc3)\">ADD JS Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc3)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc3\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec3\"></textarea>\n    </fieldset>\n\n    <button id=\"btnGITOn\" class=\"toggle\">GIT</button>\n    <fieldset id=\"fGIT\">\n        <button id=\"btnGITOff\" class=\"toggle\">GIT</button>\n        <label class=\"newSurvey_form-lbl\">GIT:</label>\n\n        <form id=\"frmGITResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg4}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg4a}}</label>\n            <input class=\"rGit\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveGITResource.resource.title\">\n            <input class=\"rGit\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveGITResource.resource.type\">\n            <input class=\"rGit\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveGITResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveGITResource, GITResources, 'GIT', 'rGit')\">Save New GIT Resource</button>\n        </form>\n        <label for=\"sGIT\">GIT Resources</label>\n        <select id=\"sGIT\" data-ng-model=\"selectedGITRes\" data-ng-options=\"r.title for r in GITResources\" data-ng-click=\"removeResource($event, selectedGITRes, GITResources, 'GIT')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedGITRes.name}}\n        <button data-ng-click=\"addResource(selectedGITRes, selectedPgp.recsrc4)\">ADD GIT Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc4)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc4\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec4\"></textarea>\n    </fieldset>\n\n    <button id=\"btnDSAOn\" class=\"toggle\">DATA</button>\n    <fieldset id=\"fDSA\">\n        <button id=\"btnDSAOff\" class=\"toggle\">DATA</button>\n        <label class=\"newSurvey_form-lbl\">Data structures and algorithms:</label>\n\n        <form id=\"frmDSAResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg5}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg5a}}</label>\n            <input class=\"rDsa\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveDSAResource.resource.title\">\n            <input class=\"rDsa\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveDSAResource.resource.type\">\n            <input class=\"rDsa\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveDSAResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveDSAResource, DSAResources, 'DSA', 'rDsa')\">Save New Data Resource</button>\n        </form>\n        <label for=\"sDSA\">Data Structures and Algorithms Resources</label>\n        <select id=\"sDSA\" data-ng-model=\"selectedDSARes\" data-ng-options=\"r.title for r in DSAResources\" data-ng-click=\"removeResource($event, selectedDSARes, DSAResources, 'DSA')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedDSARes.name}}\n        <button data-ng-click=\"addResource(selectedDSARes, selectedPgp.recsrc5)\">ADD Data Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc5)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc5\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec5\"></textarea>\n    </fieldset>\n\n    <button id=\"btnCMDOn\" class=\"toggle\">TERMINAL</button>\n    <fieldset id=\"fCMD\">\n        <button id=\"btnCMDOff\" class=\"toggle\">TERMINAL</button>\n        <label class=\"newSurvey_form-lbl\">Command line interface:</label>\n\n        <form id=\"frmCMDResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg6}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg6a}}</label>\n            <input class=\"rCmd\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveCMDResource.resource.title\">\n            <input class=\"rCmd\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveCMDResource.resource.type\">\n            <input class=\"rCmd\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveCMDResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveCMDResource, CMDResources, 'CMD', 'rCmd')\">Save New Terminal Resource</button>\n        </form>\n        <label for=\"sCMD\">Command Line (terminal) Resources</label>\n        <select id=\"sCMD\" data-ng-model=\"selectedCMDRes\" data-ng-options=\"r.title for r in CMDResources\" data-ng-click=\"removeResource($event, selectedCMDRes, CMDResources, 'CMD')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedCMDRes.name}}\n        <button data-ng-click=\"addResource(selectedCMDRes, selectedPgp.recsrc6)\">ADD Terminal Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc6)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc6\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec6\"></textarea>\n    </fieldset>\n\n    <button id=\"btnOOPOn\" class=\"toggle\">Object-Orientated</button>\n    <fieldset id=\"fOOP\">\n        <button id=\"btnOOPOff\" class=\"toggle\">Object-Orientated</button>\n        <label class=\"newSurvey_form-lbl\">Object-oriented programming:</label>\n\n        <form id=\"frmOOPResource\">\n            <label class=\"ppgrating\">{{selectedPgp.rtg7}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg7a}}</label>\n            <input class=\"rOop\" type=\"text\" placeholder=\"New Resource Title\" data-ng-model=\"saveOOPResource.resource.title\">\n            <input class=\"rOop\" type=\"text\" placeholder=\"New Resource type\" data-ng-model=\"saveOOPResource.resource.type\">\n            <input class=\"rOop\" type=\"text\" placeholder=\"New Resource Link\" data-ng-model=\"saveOOPResource.resource.rlink\">\n            <button data-ng-click=\"saveResource(saveOOPResource, OOPResources, 'OOP', 'rOop')\">Save New Object-oriented Resource</button>\n        </form>\n        <label for=\"sOOP\">Object-oriented Programing Resources</label>\n        <select id=\"sOOP\" data-ng-model=\"selectedOOPRes\" data-ng-options=\"r.title for r in OOPResources\" data-ng-click=\"removeResource($event, selectedOOPRes, OOPResources, 'OOP')\">\n        </select>\n        <lable>Resource Blame:</lable> {{selectedOOPRes.name}}\n        <button data-ng-click=\"addResource(selectedOOPRes, selectedPgp.recsrc7)\">ADD Object-oriented Resource to Plan</button>\n        <label>Remove from Plan: Alt+Click</label>\n        <ul class=\"resourceList\">\n            <li class=\"animate-repeat\" data-ng-click=\"removeRsrcFromPGP($event, rec, selectedPgp.recsrc7)\"\n                data-ng-repeat=\"rec in selectedPgp.recsrc7\">\n                Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n            </li>\n            <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                <strong>No results found...</strong>\n            </li>\n        </ul>\n        <textarea rows=\"5\" placeholder=\"Please enter recommendations here\" class=\"newSurvey_form-textarea\"\n                  data-ng-model=\"selectedPgp.rec7\"></textarea>\n    </fieldset>\n</fieldset>\n\n<fieldset>\n    <legend>Questions/Concerns?</legend>\n    <p class=\"newSurvey_form-std\">PreSurvey: {{selectedPgp.note}}</p>\n    <p class=\"newSurvey_form-std\">PostSurvey: {{selectedPgp.noteA}}</p>\n    <label class=\"newSurvey_form-lbl\">Responses:</label>\n    <textarea rows=\"5\" placeholder=\"Enter responses to Questions and concerns here.\" class=\"newSurvey_form-textarea\"\n              data-ng-model=\"selectedPgp.feedbk\"></textarea>\n</fieldset>\n    <button data-ng-click=\"savePgp(selectedPgp)\">Save PGP</button>\n    <label for=\"cbPGP\">Check Complete to make PGP available to student</label>\n    <input class=\"cbComplete\" id=\"cbPGP\" type=\"checkbox\" data-ng-model=\"selectedPgp.recComplete\">","home":"\n    <article>\n        <p>Congratulations, you've made it to the end of our Foundations of CS and Web Development course! I truly hope\n            it has been a rewarding experience for you, and encourage you to continue to spend as much time as you can\n            honing and further developing your coding powers.</p>\n\n        <p>To help us give you the best guidance on where to go from here, please tell us a little about how strongly\n            you are feeling about the various topics we covered, and what your longer-term goals are. Your TA will share\n            some feedback and favorite resources you can use to keep you learning on your own time.</p>\n\n        <p>It's been a great honor to travel this stretch of the journey with you. I wish you the best with all that\n            this path leads you towards!</p>\n\n        <p>—Brook</p>\n    </article>\n<button id=\"mybtn\">clickMe</button>\n","login":"\n    <article class=\"userLogin\">\n        <form class=\"userLogin_form\">\n            <fieldset>\n                <legend>User Login</legend>\n                <label class=\"loginUser_form-lbl\">Email Address</label>\n                    <input id=\"username\" class=\"loginUser_form-textarea\" placeholder=\"email address\" type=\"email\"\n                       >\n                <label class=\"newUser_form-lbl\">Password</label>\n                <input id=\"password\" placeholder=\"password\" type=\"password\">\n            </fieldset>\n        </form>\n        <button id=\"btnLogin\">Submit</button>\n    </article>\n","preview_PGP":"<div data-ng-controller=\"pgpsController\" id=\"pgpout\">\n\n    <article>\n        <fieldset id=\"pgpSelection\" class=\"newSurvey_select\">\n            <select id=\"selStudents\"data-ng-model=\"selectedPgp\" data-ng-options=\"pgp.name for pgp in pgps\"></select>\n        </fieldset>\n\n        <fieldset>\n            <h1 class=\"pgpHeader\" >Personal Growth Plan For {{selectedPgp.name}}</h1>\n            <h2 class=\"hCourse\">{{ 'Course ' + selectedPgp.course}}</h2>\n        </fieldset>\n\n        <fieldset>\n            <legend class=\"pgpLegend\">Based on your self assessment responses we recommend the following resources:</legend>\n            <label class=\"ppgrating\">{{selectedPgp.rtg1}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg1a}}</label>\n            <label class=\"pgpAssTitle\">HTML:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in selectedPgp.recsrc1\">\n                    Type:{{rec.type}}: <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" data-ng-if=\"results.length == 0\">\n                    <strong>Nothing Recommended</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec1}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg2}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg2a}}</label>\n            <label class=\"pgpAssTitle\">CSS:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc2($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc2\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec2}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg3}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg3a}}</label>\n            <label class=\"pgpAssTitle\">JavaScript:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc3($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc3\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec3}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg4}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg4a}}</label>\n            <label class=\"pgpAssTitle\">GIT:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc4($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc4\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec4}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg5}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg5a}}</label>\n            <label class=\"pgpAssTitle\">Data Structures and Algorithms:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc5($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc5\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec5}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg6}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg6a}}</label>\n            <label class=\"pgpAssTitle\">Command Line/ Terminal:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc6($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc6\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec6}}</p>\n\n            <label class=\"ppgrating\">{{selectedPgp.rtg7}}</label>\n            <label class=\"ppgrating\">{{selectedPgp.rtg7a}}</label>\n            <label class=\"pgpAssTitle\">Object-orientated Programing:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromSrc7($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.recsrc7\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{selectedPgp.rec7}}</p>\n        </fieldset>\n\n        <fieldset>\n            <legend class=\"pgpLegend\">Additional resources provided based on your responses to survey questions:</legend>\n\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromGsrc1($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.goalsrc1\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromGsrc2($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.goalsrc2\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromGsrc3($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.goalsrc3\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromGsrc4($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.goalsrc4\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n\n            <ul>\n                <li class=\"animate-repeat\" data-ng-click=\"removeFromGsrc5($event, rec)\"\n                    data-ng-repeat=\"rec in selectedPgp.goalsrc5\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n\n        </fieldset>\n        <label class=\"pgpLegend\">Additional comments and responses:</label>\n        <p>{{selectedPgp.feedbk}}</p>\n\n    </article>\n    <div data-preview-pgp-ui></div>\n</div>\n","student_survey":"<article data-ng-controller=\"surveyController\" class=\"newSurvey\">\n    <h1 hidden class=\"hidden\">New Student Survey</h1>\n    <h1 ng-hide=\"!surveysComplete\">\n        Thank you for completing your post-survey. Your personal growth plan is being processed. When completed, it will be displayed here when you login.\n    </h1>\n    <form name=\"survey\" novalidate class=\"newSurvey_form\" ng-hide=\"surveysComplete\">\n\n        <fieldset class=\"newSurvey_form-info\">\n            <legend>Welcome {{survey.name}}</legend>\n            <label class=\"newSurvey_form-lbl\"></label></br>\n            <label class=\"newSurvey_form-lbl\">Course</label>\n            <input id=\"course\" required class=\"newSurvey_form-lbl\" data-ng-model=\"survey.course\">\n        </fieldset>\n\n        <section ng-hide=\"showPostSurvey\">\n            <h1>Pre-Course Self Assessment</h1>\n\n            <!--<p>We want to help you reach your goals. We've seen the work you've turned in. Now, we need your help-->\n                <!--answering the following questions, so we can create a Personalized Growth Plan for you.</p>-->\n\n            <p>How do you rate yourself on a scale from 1 to 5</p>\n\n            <p>1: I am not at all comfortable with this</p>\n\n            <p>2: I have just a little comfort with this</p>\n\n            <p>3: I am moderately comfortable with this</p>\n\n            <p>4: I am very comfortable with this</p>\n\n            <p>5: I feel ready to use this skill professionally</p>\n        </section>\n\n        <section ng-hide=\"!showPostSurvey\">\n            <h1>Post-Course Self Assessment</h1>\n\n            <p>We want to help you reach your goals. We've seen the work you've turned in. Now, we need your help\n                answering the following questions, so we can create a Personalized Growth Plan for you.</p>\n\n            <p>How do you rate yourself on a scale from 1 to 5</p>\n\n            <p>1: I am not at all comfortable with this</p>\n\n            <p>2: I have just a little comfort with this</p>\n\n            <p>3: I am moderately comfortable with this</p>\n\n            <p>4: I am very comfortable with this</p>\n\n            <p>5: I feel ready to use this skill professionally</p>\n        </section>\n\n        <fieldset name=\"rating\" class=\"newSurvey_form-sbj\">\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">HTML</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1 ===1}\" ng-click=\"survey.rtg1 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1 ===2}\" ng-click=\"survey.rtg1 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1 ===3}\" ng-click=\"survey.rtg1 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1 ===4}\" ng-click=\"survey.rtg1 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1 ===5}\" ng-click=\"survey.rtg1 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">HTML</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg1}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1a ===1}\" ng-click=\"survey.rtg1a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1a ===2}\" ng-click=\"survey.rtg1a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1a ===3}\" ng-click=\"survey.rtg1a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1a ===4}\" ng-click=\"survey.rtg1a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg1a ===5}\" ng-click=\"survey.rtg1a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">CSS</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2 ===1}\" ng-click=\"survey.rtg2 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2 ===2}\" ng-click=\"survey.rtg2 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2 ===3}\" ng-click=\"survey.rtg2 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2 ===4}\" ng-click=\"survey.rtg2 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2 ===5}\" ng-click=\"survey.rtg2 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">CSS</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg2}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2a ===1}\" ng-click=\"survey.rtg2a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2a ===2}\" ng-click=\"survey.rtg2a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2a ===3}\" ng-click=\"survey.rtg2a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2a ===4}\" ng-click=\"survey.rtg2a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg2a ===5}\" ng-click=\"survey.rtg2a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">JavaScript</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3 ===1}\" ng-click=\"survey.rtg3 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3 ===2}\" ng-click=\"survey.rtg3 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3 ===3}\" ng-click=\"survey.rtg3 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3 ===4}\" ng-click=\"survey.rtg3 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3 ===5}\" ng-click=\"survey.rtg3 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">JavaScript</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg3}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3a ===1}\" ng-click=\"survey.rtg3a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3a ===2}\" ng-click=\"survey.rtg3a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3a ===3}\" ng-click=\"survey.rtg3a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3a ===4}\" ng-click=\"survey.rtg3a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg3a ===5}\" ng-click=\"survey.rtg3a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">GIT</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4 ===1}\" ng-click=\"survey.rtg4 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4 ===2}\" ng-click=\"survey.rtg4 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4 ===3}\" ng-click=\"survey.rtg4 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4 ===4}\" ng-click=\"survey.rtg4 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4 ===5}\" ng-click=\"survey.rtg4 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">GIT</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg4}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4a ===1}\" ng-click=\"survey.rtg4a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4a ===2}\" ng-click=\"survey.rtg4a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4a ===3}\" ng-click=\"survey.rtg4a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4a ===4}\" ng-click=\"survey.rtg4a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg4a ===5}\" ng-click=\"survey.rtg4a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">Data structures and algorithms</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5 ===1}\" ng-click=\"survey.rtg5 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5 ===2}\" ng-click=\"survey.rtg5 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5 ===3}\" ng-click=\"survey.rtg5 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5 ===4}\" ng-click=\"survey.rtg5 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5 ===5}\" ng-click=\"survey.rtg5 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">Data structures and algorithms</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg5}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5a ===1}\" ng-click=\"survey.rtg5a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5a ===2}\" ng-click=\"survey.rtg5a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5a ===3}\" ng-click=\"survey.rtg5a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5a ===4}\" ng-click=\"survey.rtg5a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg5a ===5}\" ng-click=\"survey.rtg5a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">Command line interface</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6 ===1}\" ng-click=\"survey.rtg6 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6 ===2}\" ng-click=\"survey.rtg6 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6 ===3}\" ng-click=\"survey.rtg6 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6 ===4}\" ng-click=\"survey.rtg6 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6 ===5}\" ng-click=\"survey.rtg6 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">Command line interface</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg6}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6a ===1}\" ng-click=\"survey.rtg6a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6a ===2}\" ng-click=\"survey.rtg6a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6a ===3}\" ng-click=\"survey.rtg6a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6a ===4}\" ng-click=\"survey.rtg6a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg6a ===5}\" ng-click=\"survey.rtg6a = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"showPostSurvey\">\n                <label class=\"newSurvey_form-lbl\">Object-oriented programming</label></br>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7 ===1}\" ng-click=\"survey.rtg7 = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7 ===2}\" ng-click=\"survey.rtg7 = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7 ===3}\" ng-click=\"survey.rtg7 = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7 ===4}\" ng-click=\"survey.rtg7 = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7 ===5}\" ng-click=\"survey.rtg7 = 5\">5</label>\n            </div>\n\n            <div ng-hide=\"!showPostSurvey\">\n                <div class=\"preSurveyRatings\">\n                    <label class=\"newSurvey_form-lbl\">Object-oriented programming</label></br>\n                    <!--<label>Pre-Course Rating:</label>-->\n                    <!--<label class=\"selectedRating\">{{survey.rtg7}}</label></br>-->\n                </div>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7a ===1}\" ng-click=\"survey.rtg7a = 1\">1</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7a ===2}\" ng-click=\"survey.rtg7a = 2\">2</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7a ===3}\" ng-click=\"survey.rtg7a = 3\">3</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7a ===4}\" ng-click=\"survey.rtg7a = 4\">4</label>\n                <label class=\"ppgrating\" ng-class=\"{selectedRating:survey.rtg7a ===5}\" ng-click=\"survey.rtg7a = 5\">5</label>\n            </div>\n        </fieldset>\n\n        <fieldset>\n            <legend>Goals</legend>\n            <label for=\"goal\">What are your long-term goals?</label>\n            <textarea ng-hide=\"showPostSurvey\" id=\"goal\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What are your long-term goals?\" data-ng-model=\"survey.goal\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.goal}}</blockquote>-->\n                <textarea id=\"goala\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What are your long-term goals?\" data-ng-model=\"survey.goala\"></textarea>\n            </div>\n            <label for=\"goal2\">Why are you interested in developing your computer/coding skills?</label>\n            <textarea ng-hide=\"showPostSurvey\" id=\"goal2\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"Why are you interested in developing your computer/coding skills?\" data-ng-model=\"survey.goal2\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.goal2}}</blockquote>-->\n                <textarea id=\"goal2a\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"Why are you interested in developing your computer/coding skills?\" data-ng-model=\"survey.goal2a\"></textarea>\n            </div>\n            <label for=\"goal3\">What kinds of problems do you like working on?</label>\n            <textarea ng-hide=\"showPostSurvey\" id=\"goal3\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What kinds of problems do you like working on?\" data-ng-model=\"survey.goal3\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.goal3}}</blockquote>-->\n                <textarea id=\"goal3a\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What kinds of problems do you like working on?\" data-ng-model=\"survey.goal3a\"></textarea>\n            </div>\n            <label for=\"goal4\">What would you like to do next?</label>\n            <textarea ng-hide=\"showPostSurvey\" id=\"goal4\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What would you like to do next?\" data-ng-model=\"survey.goal4\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.goal4}}</blockquote>-->\n                <textarea id=\"goal4a\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What would you like to do next?\" data-ng-model=\"survey.goal4a\"></textarea>\n            </div>\n            <label for=\"goal5\">What would you like to be able to accomplish with code?</label>\n            <textarea ng-hide=\"showPostSurvey\" id=\"goal5\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What would you like to be able to accomplish with code?\" data-ng-model=\"survey.goal5\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.goal5}}</blockquote>-->\n                <textarea id=\"goal5a\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"What would you like to be able to accomplish with code?\" data-ng-model=\"survey.goal5a\"></textarea>\n            </div>\n        </fieldset>\n\n        <fieldset>\n            <legend>Questions/Concerns?</legend>\n            <textarea ng-hide=\"showPostSurvey\" id=\"note\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"Please share any questions or concerns you may have.\" data-ng-model=\"survey.note\">\n            </textarea>\n            <div ng-hide=\"!showPostSurvey\">\n                <!--<label>Pre-Survey Answer:</label>-->\n                <!--<blockquote class=\"preQuestQuote\">{{survey.note}}</blockquote>-->\n                <textarea id=\"noteA\" rows=\"10\" class=\"newSurvey_form-textarea\" placeholder=\"Please share any questions or concerns you may have.\" data-ng-model=\"survey.noteA\"></textarea>\n            </div>\n        </fieldset>\n        <div ng-hide=\"showPostSurvey\">\n            <label for=\"cbPreSurvey\">When you have completed your pre-survey, check here to have it processed</label>\n            <input class=\"cbComplete\" id=\"cbPreSurvey\" type=\"checkbox\" data-ng-model=\"survey.preRtgComplete\">\n            <button data-ng-click=\"saveSurvey()\">SAVE</button>\n        </div>\n        <div ng-hide=\"!showPostSurvey\">\n            <label for=\"cbPostSurvey\">When you have completed your post-survey, check here to have it processed</label>\n            <input class=\"cbComplete\" id=\"cbPostSurvey\" type=\"checkbox\" data-ng-model=\"survey.rtgComplete\">\n            <button data-ng-click=\"saveSurvey()\">SAVE</button>\n        </div>\n    </form>\n</article>\n\n","view_PGP":"<div data-ng-controller=\"viewPGPController\" id=\"pgpout\">\n\n    <article>\n        <fieldset>\n            <h1 class=\"pgpHeader\" >Personal Growth Plan For {{pgp.name}}</h1>\n            <h2 class=\"hCourse\">{{ 'Course ' + pgp.course}}</h2>\n        </fieldset>\n        <fieldset>\n            <legend class=\"pgpLegend\">Based on your self assessment responses we recommend the following resources:</legend>\n            <label class=\"ppgrating\">{{pgp.rtg1}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg1a}}</label>\n            <label class=\"pgpAssTitle\">HTML:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc1\">\n                    Type:{{rec.type}}: <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" data-ng-if=\"results.length == 0\">\n                    <strong>Nothing Recommended</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec1}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg2}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg2a}}</label>\n            <label class=\"pgpAssTitle\">CSS:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc2\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec2}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg3}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg3a}}</label>\n            <label class=\"pgpAssTitle\">JavaScript:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc3\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec3}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg4}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg4a}}</label>\n            <label class=\"pgpAssTitle\">GIT:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc4\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec4}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg5}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg5a}}</label>\n            <label class=\"pgpAssTitle\">Data Structures and Algorithms:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc5\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec5}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg6}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg6a}}</label>\n            <label class=\"pgpAssTitle\">Command Line/ Terminal:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc6\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec6}}</p>\n            <label class=\"ppgrating\">{{pgp.rtg7}}</label>\n            <label class=\"ppgrating\" ng-hide=\"!showPostSurvey\">{{pgp.rtg7a}}</label>\n            <label class=\"pgpAssTitle\">Object-orientated Programing:</label>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.recsrc7\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <p>{{pgp.rec7}}</p>\n        </fieldset>\n        <fieldset>\n            <legend class=\"pgpLegend\">Additional resources provided based on your responses to survey questions:</legend>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.goalsrc1\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.goalsrc2\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.goalsrc3\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.goalsrc4\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n            <ul>\n                <li class=\"animate-repeat\" data-ng-repeat=\"rec in pgp.goalsrc5\">\n                    Type:{{rec.type}} <a data-ng-href=\"{{rec.rlink}}\">{{rec.title}}</a>\n                </li>\n                <li class=\"animate-repeat\" ng-if=\"results.length == 0\">\n                    <strong>No results found...</strong>\n                </li>\n            </ul>\n        </fieldset>\n        <label class=\"pgpLegend\">Additional comments and responses:</label>\n        <p>{{pgp.feedbk}}</p>\n    </article>\n</div>\n"};
},{}],3:[function(require,module,exports){
/**
 * clientValidation
 * Created by dcorns on 4/28/15.
 * single value validations return an empty string if valid, otherwise they return an error message string
 * multi-value validations recieve an object and return an empty array if valid, otherwise they return an array of error objects of the form {property: error message}
 */
'use strict';
var dgClientValidate = {};

function validateTitleTextLength(str){
  var valid = 'Title must be less than 25 characters long', len = str.length;
  if (len < 25) {
    valid = '';
  }
  if (len < 2) {
    valid = 'Title must be at least 2 characters long';
  }
  return valid;
}

function validateTitleCharacters(str){
  var valid = 'Title can only contain alphanumeric characters and -, \', \"';
  var regx = /^[A-Za-z\d\s'"-]+$/;
  if (regx.test(str)) {
    valid = '';
  }
  return valid;
}

function validateDescriptionCharacters(str){
  var valid = 'Description can only contain alphanumeric characters, -, \', \", and period';
  var regx = /^[A-Za-z\d\s'"-\.]+$/;
  if (regx.test(str)) {
    valid = '';
  }
  return valid;
}

function validateResourceTopicArray(ary){
  var valid = 'Please select at least one topic to save a new resource';
  if (ary.length > 0) {
    valid = '';
  }
  return valid;
}

function validateLink(lnk){
  var valid = 'Resource Links must start with http(s):// and not contain any unsafe characters (^, %, , <>, [], {}, #, \\, \", `, ~, |)';
  var regx = /^https?:\/\/.*[^%<>\s#\{\}"|\\\^\[\]`~]$/i;
  if (regx.test(lnk)) {
    valid = '';
  }
  return valid;
}

function validateResourceDescription(str){
  var valid = 'A two or more word description is required';
  var regx = /^.*\s\S.*$/;
  if(regx.test(str)){
    if (str) {
      valid = validateDescriptionCharacters(str);
    }
  }
  return valid;
}

dgClientValidate.validateResource = function (resourceObj){
  var errCount = 0, errorObj = {title:[], description:[], resourceLink:[], resourceTopics:[]}, result = '', validate;

  validate = validateTitleTextLength(resourceObj.title);
  errorObj.title = checkValidate(validate, errorObj.title);

  validate = validateTitleCharacters(resourceObj.title);
  errorObj.title = checkValidate(validate, errorObj.title);

  validate = validateResourceTopicArray(resourceObj.topics);
  errorObj.resourceTopics = checkValidate(validate, errorObj.resourceTopics);

  validate = validateResourceDescription(resourceObj.description);
  errorObj.description = checkValidate(validate, errorObj.description);

  if(resourceObj.resourceLink) {
    validate = validateLink(resourceObj.resourceLink);
    errorObj.resourceLink = checkValidate(validate, errorObj.resourceLink);
  }

  if(errCount > 0) {
    result = buildErrorString(errorObj);
  }

  return result;

  function checkValidate(validator, errorAry){
    if(validator.length > 0){
      errorAry.push(validator);
      errCount += 1;
    }
    return errorAry;
  }
};

function buildErrorString(errObj){
  var errorString = '';
  for (var prop in errObj){
    if(errObj.hasOwnProperty(prop)){
      if(errObj[prop].length > 0){
        errorString = errorString + prop + ':\n';
        var c = 0, len = errObj[prop].length;
        for (c; c < len; c++) {
          errorString = errorString + errObj[prop][c] + '\n';
        }
      }
    }
  }
  return errorString;
}

module.exports = function (app) {
  app.dgClientValidate = dgClientValidate;
};
},{}],4:[function(require,module,exports){
/**
 * controllerRegistry
 * Created by dcorns on 5/26/15.
 * modules required in this file are specifically for associated views. The property names should be equal to the associated html file name which is equal to the associated js file name used with the path as the argument to the require statement which is the value of the property. This file is used by router.js to invoke the java script when the matching view is loaded.
 */
'use strict';
module.exports = function (){
  return{
    home: require('./home'),
    login: require('./login'),
    create_PGP: require('./create_PGP')
  };
};
},{"./create_PGP":5,"./home":6,"./login":7}],5:[function(require,module,exports){
/**
 * create_PGP
 * Created by dcorns on 6/1/15.
 */
'use strict';
module.exports = function(){
  //set button visibility
  document.getElementById('btncreateaccount').style.display = 'none';
  document.getElementById('btnlogin').style.display = 'none';
  document.getElementById('btnviewpgp').style.display = 'inline';
  //
  var dataobj = {}
  var storage = window.sessionStorage, pgpArray = [], pgpResources = [], pgpTopics = [], token = storage.getItem('token');
  if(token){
    dgApp.dgMethod.ajaxGet('/api/v_0_0_1/pgps', function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      if(data){
        pgpArray = data.n;
        var formIdx = storage.getItem('formIdx');
        dgApp.dgMethod.dataLoadSelect('studentSelect', data.n, 'name', '_id');
        var studentSelect = document.getElementById('studentSelect');
        //sync studentSelect index from previous pages if it was selected
        if(formIdx){
          dgApp.pgpMdl = pgpArray[formIdx];
          studentSelect.selectedIndex = formIdx;
        }
        else{
          dgApp.pgpMdl = pgpArray[0];
          storage.setItem('formIdx', '0');
        }
        //
        dgApp.userId = data.u._id;
        getAllResources(data.u);
        addHandlers();
      }

    }, token);
  }
  function getAllResources(usr){
    dgApp.dgMethod.ajaxPostJson('/api/v_0_0_1/pgps/resources/',usr, function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      pgpResources = data.resourceList;
      console.dir(pgpResources);
      pgpTopics = data.topicList;
      dgApp.dgMethod.dataLoadSelect('resources2', pgpResources, 'title');
      dgApp.dgMethod.makeFormCheckBoxGroup('rTypes', pgpTopics, 'name', 'description', 'cId');
      //register superSelect component
      dataobj.pgpResources = pgpResources;
      dataobj.pgpTopics = pgpTopics;
      dataobj.titles = ['title', 'description', 'resourceLink', 'addedBy'];
      dgApp.dgComponents.superSelect(dataobj);

    });
  }
  function addHandlers(){

    var studentSelect = document.getElementById('studentSelect');
    //studentSelect.addEventListener('click', setPgpData);
    //studentSelect.addEventListener('change', setPgpData);
    document.getElementById('btnSaveNewResource').addEventListener('click', function(e){
      var topicFrm = document.getElementById('chooseResourceTopics');
      var topicArray = [];
      var c = 0, len = topicFrm.length;
      for (c; c < len; c++) {
        if (topicFrm[c].checked) {
          topicArray.push(parseInt(topicFrm[c].alt));
        }
      }
      //resrcTitle resrcDescription resrcLink
      var newResource = {title: document.getElementById('resrcTitle').value, topics: topicArray};
      newResource.description = document.getElementById('resrcDescription').value;
      newResource.resourceLink = document.getElementById('resrcLink').value;
      var errorString = dgApp.dgClientValidate.validateResource(newResource);
      if (errorString.length > 0) {
        alert(errorString);
      }
      else{
        newResource.token = token;
        console.dir(newResource);
        if(dgApp.dgMethod.arrayContains(pgpResources, newResource.title, 'title')){
          alert(newResource.title + ' is already a resource title.');
        }
        else{
          if(dgApp.dgMethod.arrayContains(pgpResources, newResource.resourceLink, 'resourceLink') && (newResource.resourceLink !== '')){
            alert(newResource.resourceLink + ' is already a resource link');
          }
          else{
            //save resource
            saveResource(newResource, pgpResources);
          }
        }
      }
    });
    var selResources = document.getElementById('resources');
    selResources.addEventListener('click', function(e){
      if (e.altKey) {
        removeResource(e);
      }
    });

  }

  function populateResourceTypeElements(e){
   console.dir(e);
  }
  function resourceOptionClick(e){
    console.dir(e);
  }

};
},{}],6:[function(require,module,exports){
/**
 * home
 * Created by dcorns on 6/1/15.
 */
'use strict';
var views = require('../build/views');
var controllers = require('./controllerRegistry')();
var route = require('../router')(views, controllers);
module.exports = function(){
  document.getElementById('btncreatepgp').style.display = 'none';
  document.getElementById('btnsurvey').style.display = 'none';
  document.getElementById('btnviewpgp').style.display = 'none';

};
},{"../build/views":2,"../router":13,"./controllerRegistry":4}],7:[function(require,module,exports){
/**
 * loginController
 * Created by dcorns on 3/12/15.
 */
'use strict';
var errHandle = require('../handleErrors')();
var ui = require('../ui');

function userLogin() {
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
}

module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  document.getElementById('btncreateaccount').className = 'nav_ul-li-a';
  document.getElementById('btnLogin').onclick = userLogin;
  var uName = document.getElementById('username');
  var psw = document.getElementById('password');
  dgApp.dgMethod.dataBindInput(uName, 'change', 'userMdl', 'email');
  dgApp.dgMethod.dataBindInput(psw, 'change', 'userMdl', 'password');
};
},{"../handleErrors":10,"../ui":15}],8:[function(require,module,exports){
/**
 * dgComponents
 * Created by dcorns on 6/9/15.
 */
'use strict';
var dgComponents = {};

dgComponents.superSelect = function(obj){
  var proto = Object.create(HTMLElement.prototype);
  proto.showAll = false;
  proto.createdCallback = function(){
    var shadowdom = this.createShadowRoot();
    //console.dir(shadowdom);

    //console.dir(shadowdom.host.dataset);
    //console.dir(this.shadowRoot.children);


    shadowdom.innerHTML = '<section><input><button>*</button><input type="number" value="5"><ul></ul><section></section></section>';

    //var subHTML = this.shadowRoot.children;
    var sSelect = this.shadowRoot.firstChild, sSKids = sSelect.children, searchTxt = sSKids[0], preferenceBtn = sSKids[1], numItemsToDisplay = sSKids[2], itemList = sSKids[3], sSDescriptions = sSKids[4];
    //Set Internal Styles
    numItemsToDisplay.style.width = '30px';
    var listStyle = sSelect.style;
    listStyle.display = 'block'; listStyle.borderStyle = 'solid'; listStyle.borderWidth = '3'; listStyle.width = '240px';
    var itemStyle = itemList.style;
    itemStyle.listStyle = 'none'; itemStyle.margin = '0'; itemStyle.padding = '0';
    //Add event listeners for sub elements
    searchTxt.addEventListener('keyup', function(e){
      console.log(e.target.value);
    });
    searchTxt.addEventListener('mouseenter', function(e){
      e.target.style.backgroundColor = 'grey';
    });
    searchTxt.addEventListener('mouseout', function(e){
      e.target.style.backgroundColor = 'white';
    });
    searchTxt.addEventListener('click', function(e){
      e.target.style.backgroundColor = 'white';
    });
    preferenceBtn.addEventListener('click', function(e){
      var showAll = e.target.parentNode.parentNode.host.showAll;
      if(showAll){
        e.target.parentNode.parentNode.host.showAll = false;
        preferenceBtn.innerHTML = '*'
      }
      else{
        e.target.parentNode.parentNode.host.showAll = true;
        preferenceBtn.innerHTML = '@'
      }
      console.log(showAll);
    });

    numItemsToDisplay.addEventListener('change', function(e){
      console.log(e.target.value);
      //var x = e.target.parentNode.host.dataset.items;
      //console.dir(obj[x]);
    });
    loadDefaults();
    function loadDefaults(){
      var data = shadowdom.host.dataset, items =obj[data.items], filters = obj[data.filters], titles = obj[data.titles];
      var extraTitles = false; if(titles.length > 1) extraTitles = true;
      if(titles){
        var len = items.length, c = 0, el;
        for(c;c<len;c++){
          el = document.createElement('li');
          el.innerHTML = items[c][titles[0]];
          if(extraTitles){
            var len2 = titles.length, c2 = 1;
            for(c2;c2<len2;c2++){
              el.setAttribute('data-' + titles[c2], items[c][titles[c2]]);
            }
            el.addEventListener('mouseenter', function(e){
              e.target.style.backgroundColor = 'grey';
              var data = e.target.dataset;
              var sSDescKids = sSDescriptions.children;
              for(var prop in data){
                if(data.hasOwnProperty(prop)){
                  c2 = 0;  len2 = sSDescKids.length;
                  for(c2;c2<len2;c2++){
                    if(prop === sSDescKids[c2].innerHTML.toLowerCase()){
                      c2++;
                      sSDescKids[c2].innerHTML = data[prop];
                    }
                  }
                }
              }

            });
            el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
          }
          else{
            el.addEventListener('mouseenter', function(e){e.target.style.backgroundColor = 'grey';});
            el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
          }
          itemList.appendChild(el);
        }
        if(extraTitles){
          var descData;
          len = titles.length; c = 1;
          for(c;c<len;c++){
            el = document.createElement('label');
            el.innerHTML = titles[c];
            el.style.position = 'relative';
            descData = document.createElement('label');
            descData.style.position = 'relative';
            sSDescriptions.appendChild(el);
            sSDescriptions.appendChild(descData);
          }
        }
      }
    }

  };

  document.registerElement('super-select', {prototype: proto});

};

module.exports = function (app){
  app.dgComponents = dgComponents;
};
},{}],9:[function(require,module,exports){
/**
 * dgMethods
 * Created by dcorns on 3/16/15.
 * Common methods for dgApp
 */
'use strict';
var dgMethod = {};
//Method for setting scripts to run after the window loads
dgMethod.winReady = function(f){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = f;
  }
  else{
    window.onload = function() {
      preOnload();
      f();
    }
  }
};

dgMethod.ajaxPostJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
if(token){
  ajaxReq.setRequestHeader('Authorization', token);
}
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxPutJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('PUT', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxGet = function(url, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('GET', url, true);
  //ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send();
};

dgMethod.dataBindInput = function(elem, evnt, mdl, item){
  elem.addEventListener(evnt, function(){
    dgApp[mdl][item] = this.value;
  });
};

dgMethod.dataLoadSelect = function(elId, ary, item) {
  var el = document.getElementById(elId);
  el.innerHTML = '';
  var len = ary.length, c = 0, opt, display;
  for (c; c < len; c++) {
    if (Array.isArray(item)) {
      display = '';
      var itLen = item.length, itC = 0;
      for (itC; itC < itLen; itC++) {
        display = display + ary[c][item[itC]] + '|';
      }
      display = display.substr(0, display.length - 1);
    }
    else {
      display = '<label class=selOptTitle>' + ary[c][item] + '</label>';
    }
    opt = document.createElement('option');
    opt.innerHTML = display;
    opt.accessKey = c;
    el.appendChild(opt);
  }
};

dgMethod.makeFormCheckBoxGroup = function(formID, data, nameKey, descriptionKey, idKey){
  var elId = document.getElementById(formID), c = 0, len = data.length, cb, cblbl;
  for(c; c < len; c++){
    cb = document.createElement('input');
    cb.id = formID+ 'Cb' + c;
    cb.title = data[c][descriptionKey];
    cblbl = document.createElement('label');
    cblbl.for = cb.id;
    cblbl.innerHTML = data[c][nameKey];
    cb.setAttribute('type', 'checkbox');
    cb.alt = data[c][idKey] || c;
    elId.appendChild(cblbl);
    elId.appendChild(cb);
  }
};

dgMethod.arrayContains = function(ary, aValue, aKey){
  var c = 0, len = ary.length;
  if (aKey) {
    for (c; c < len; c++) {
      if(ary[c][aKey] === aValue) return true;
    }
  }
  else{
    for (c; c < len; c++) {
      if(ary[c] === aValue) return true;
    }
  }
};

dgMethod.selectAddOption = function (selId, optObj, item){
  var opt = document.createElement('option');
  opt.innerHTML = optObj[item];
  console.log(opt.innerHTML);
  var sel = document.getElementById(selId);
  opt.accessKey = sel.options.length;
  sel.appendChild(opt);
};

module.exports = function (app){
  app.dgMethod = dgMethod;
};
},{}],10:[function(require,module,exports){
/**
 * Created by dcorns on 11/14/14.
 */
'use strict';
module.exports = function(){
  return{
    alertObject: function(obj){
      var msg = '';
      for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
          msg = msg + obj[prop] + '\n';
        }
      }
      return alert(msg);
    }
  };
};
},{}],11:[function(require,module,exports){
/**
 * Created by dcorns on 11/10/14.
 */
'use strict';
module.exports = function(obj){
  return {
    buildSurvey: function(){
      obj.name = window.sessionStorage.getItem('name');
      obj.ta = window.sessionStorage.getItem('ta');
      obj.student = window.sessionStorage.getItem('student');
      obj.course = window.sessionStorage.getItem('course');
      obj.rtg1 = window.sessionStorage.getItem('rtg1');
      obj.rtg2 = window.sessionStorage.getItem('rtg2');
      obj.rtg3 = window.sessionStorage.getItem('rtg3');
      obj.rtg4 = window.sessionStorage.getItem('rtg4');
      obj.rtg5 = window.sessionStorage.getItem('rtg5');
      obj.rtg6 = window.sessionStorage.getItem('rtg6');
      obj.rtg7 = window.sessionStorage.getItem('rtg7');
      obj.note = window.sessionStorage.getItem('note');
      obj.goal = window.sessionStorage.getItem('goal');
      obj.goal2 = window.sessionStorage.getItem('goal2');
      obj.goal3 = window.sessionStorage.getItem('goal3');
      obj.goal4 = window.sessionStorage.getItem('goal4');
      obj.goal5 = window.sessionStorage.getItem('goal5');
      obj.rtgComplete = window.sessionStorage.getItem('rtgComplete');
      return obj;
    }
  }
};
},{}],12:[function(require,module,exports){
/**
 * Created by dcorns on 11/12/14.
 */
'use strict';
var ui = require('../js/ui');
module.exports = function($scope, $http){
  var ux = ui();
  $scope.removeResource = function (e, item, rsrc, rsrcFor) {
    var obj = {resourceFor: rsrcFor, resource: item};
    if(e.altKey){
      $http.put('api/v_0_0_1/resources/', obj)
        .success(function (data) {
          alert(data.title +' deleted!');
          $scope.getAllResources();
        })
        .error(function (data) {
          console.dir(data);
          alert(data.error);
        });
    }
  };
  $scope.saveResource = function (nrsrc, rsrc, rsrcFor, inputClass) {
    nrsrc.resourceFor = rsrcFor;
    $http.post('api/v_0_0_1/resources/', nrsrc)
      .success(function (data) {
        ux.blankInput(inputClass);
        if (typeof rsrc !== 'undefined') {
          rsrc.push(data);
        }
        else {
          rsrc = [data];
        }
        alert("New " + rsrcFor + " Resource Saved!");
      })
      .error(function (data) {
        console.dir(data);
        alert("Error saving resource!");
      });
  };
  $scope.getAllResources = function () {
    $http({
      method: 'GET',
      url: '/api/v_0_0_1/resources/'
    }).success(function (data) {
      $scope.resources = data;
      for (var i = 0; i < data.length; i++) {
        console.log(i + ', ' + data[i].resourceFor);
        data[i].resource.sort(function(a, b){
          if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
          return 0;
        });
        switch (data[i].resourceFor) {
          case 'General':
            $scope.genResources = data[i].resource;
            $scope.selectedG1Res = $scope.genResources[0];
            $scope.selectedG2Res = $scope.genResources[0];
            $scope.selectedG3Res = $scope.genResources[0];
            $scope.selectedG4Res = $scope.genResources[0];
            $scope.selectedG5Res = $scope.genResources[0];
            break;
          case 'HTML':
            $scope.HTMLResources = data[i].resource;
            $scope.selectedHTMLRes = $scope.HTMLResources[0];
            break;
          case 'CSS':
            $scope.CSSResources = data[i].resource;
            $scope.selectedCSSRes = $scope.CSSResources[0];
            break;
          case 'JS':
            $scope.JSResources = data[i].resource;
            $scope.selectedJSRes = $scope.JSResources[0];
            break;
          case 'GIT':
            $scope.GITResources = data[i].resource;
            $scope.selectedGITRes = $scope.GITResources[0];
            break;
          case 'DSA':
            $scope.DSAResources = data[i].resource;
            $scope.selectedDSARes = $scope.DSAResources[0];
            break;
          case 'CMD':
            $scope.CMDResources = data[i].resource;
            $scope.selectedCMDRes = $scope.CMDResources[0];
            break;
          case 'OOP':
            $scope.OOPResources = data[i].resource;
            $scope.selectedOOPRes = $scope.OOPResources[0];
            break;
          default:
            break;
        }
      }

    }).error(function (data, status) {
      console.dir(data);
      console.log('error!');
      console.log(status);
    });
  };
  $scope.addResource = function (sel, rsrc) {
    console.log('Add Resource');
    rsrc.push(sel);
  };
  $scope.removeRsrcFromPGP = function (e, item, rsrc) {
    console.dir(e); console.dir(item); console.dir(rsrc);
    if (e.altKey) {
      var idx = rsrc.indexOf(item);
      rsrc.splice(idx, 1);
    }
  };

  return $scope;
};
},{"../js/ui":15}],13:[function(require,module,exports){
/**
 * router.js
 * Created by dcorns on 5/25/15.
 * takes in a view object like the one created with grunt-add-view and with the expectation that every view in the view object has an associated javascript file by the same name to run when the view is chosen
 */
'use strict';
module.exports = function(views, controllers){
  function loadRoute(route, pEl){
    var el = pEl || 'main-content';
    var view = route.substr(route.lastIndexOf('/') + 1);
    document.getElementById(el).innerHTML = views[view];
    if(controllers[view]){
      controllers[view]();
    }
  }
  return loadRoute;
};
},{}],14:[function(require,module,exports){
/**
 * Created by dcorns on 11/9/14.
 */
'use strict';

module.exports = function(obj){
  return {
    saveNote: function(){
      for (var prop in obj) {
        if(obj.hasOwnProperty( prop )) {
          if(obj[prop]){
            if(Array.isArray(obj[prop])){
              for(var i = 0; i < obj[prop].length; i++){
                for(var subProp in obj[prop][i]){
                  if(obj[prop][i].hasOwnProperty(subProp)){
                    window.sessionStorage.setItem(prop+subProp+i, obj[prop][i][subProp]);
                  }
                }

                console.dir(obj[prop][i]);
              }
            }
            else{
              window.sessionStorage.setItem(prop, obj[prop]);
            }
          }
        }
      }
    }
  }
};
},{}],15:[function(require,module,exports){
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
    addTag: function(elId, tg, tgId, cls, tgHtml){
      var newTg = document.createElement(tg);
      newTg.id = tgId;
      newTg.className = cls || '';
      newTg.innerHTML = tgHtml || '';
      document.getElementById(elId).appendChild(newTg);
    },
    addTextTag: function(elId, tg, txt, cls){
      var par = document.createElement(tg);
      par.innerHTML = txt;
      par.className = cls || '';
      document.getElementById(elId).appendChild(par);
    },
    addInput: function(elId, tgId, placeTxt, tgtype){
      var i = document.createElement('input');
      i.id = tgId;
      i.placeholder = placeTxt;
      i.type = tgtype;
      document.getElementById(elId).appendChild(i);
    },
    addButton: function(elId, tgId, tgText, cls){
      var b = document.createElement('button');
      b.className = cls || '';
      b.id = tgId;
      b.innerHTML = tgText;
      b.type = 'button'; //this keeps the automatic page refresh from happening when used in a form
      document.getElementById(elId).appendChild(b);
    },
    addToggleButton: function(elId, tgId, tgText1, tgText2, cls, f1, f2){
      var b = document.createElement('button');
      b.className = cls || '';
      b.id = tgId;
      b.innerHTML = tgText1;
      b.type = 'button';
      var clicked = true;
      b.addEventListener('click', function(e){
        if(clicked){
          clicked = false;
          e.srcElement.innerHTML = tgText1;
          if(f1){
            f1();
          }
        }
        else{
          clicked = true;
          e.srcElement.innerHTML = tgText2;
          if(f2){
            f2();
          }
        }
      });
      document.getElementById(elId).appendChild(b);
    },
    addToggleViewButton: function(elId, tgId, tgTxt, cls, tglView){
      this.addToggleButton(elId, tgId, tgTxt, tgTxt, cls, function(){
        var fm = document.getElementById(tglView);
        document.getElementById(tgId).className = 'btnOff';
        fm.hidden = true;
      }, function(){
        var fm = document.getElementById(tglView);
        document.getElementById(tgId).className = 'btnOn';
        fm.hidden = false;
      });
    },
    addLabel: function(elId, lblFor, lblTxt){
      var l = document.createElement(('label'));
      l.htmlFor = lblFor;
      l.innerHTML = lblTxt;
      document.getElementById(elId).appendChild(l);
    },
    replaceClass: function(tgId, cls){
      document.getElementById(tgId).className = cls;
    }

  }
};

},{}],16:[function(require,module,exports){
/**
 * pgp
 * Created by dcorns on 3/25/15.
 */
'use strict';
var pgpMdl = {
  name: String,
  ta: String,
  student: String,
  course: String,
  rtg1: String,
  rtg2: String,
  rtg3: String,
  rtg4: String,
  rtg5: String,
  rtg6: String,
  rtg7: String,
  rtg1a: String,
  rtg2a: String,
  rtg3a: String,
  rtg4a: String,
  rtg5a: String,
  rtg6a: String,
  rtg7a: String,
  note: String,
  goal: String,
  goal2: String,
  goal3: String,
  goal4: String,
  goal5: String,
  goala: String,
  goal2a: String,
  goal3a: String,
  goal4a: String,
  goal5a: String,
  goalsrc1: [],
  goalsrc2: [],
  goalsrc3: [],
  goalsrc4: [],
  goalsrc5: [],
  rec1: String,
  rec2: String,
  rec3: String,
  rec4: String,
  rec5: String,
  rec6: String,
  rec7: String,
  recsrc1: [],
  recsrc2: [],
  recsrc3: [],
  recsrc4: [],
  recsrc5: [],
  recsrc6: [],
  recsrc7: [],
  moresrc: [],
  feedbk: String,
  preRtgComplete: Boolean,
  rtgComplete: Boolean,
  recComplete: Boolean,
  status: String
};
module.exports = function (app){
  app.pgpMdl = pgpMdl;
};
},{}],17:[function(require,module,exports){
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
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);