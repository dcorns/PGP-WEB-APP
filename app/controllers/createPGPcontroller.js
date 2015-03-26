/**
 * createPGPcontroller
 * Created by dcorns on 3/12/15.
 */
'use strict';
var errHandle = require('../js/handleErrors')();
module.exports = function(){
  //check authorization before loading data
  var storage = window.sessionStorage;
  var pgpArray = [];
  var pgpResources = [];
  var token = storage.getItem('token');
  if(token){
    dgApp.dgMethod.ajaxGet('/api/v_0_0_1/pgps', function(err, data){
      if(err){
        errHandle.alertObject(err); return;
      }
      if(data){
        pgpArray = data.n;
        var formIdx = storage.getItem('formIdx');
        if(formIdx){
          dgApp.pgpMdl = pgpArray[formIdx];
        }
        else{
          dgApp.pgpMdl = pgpArray[0];
          storage.setItem('formIdx', '0');
        }
        dgApp.dgMethod.dataLoadSelect('studentSelect', data.n, 'name', '_id');

        document.getElementById('studentSelect').addEventListener('click', function(e){
          var idx = e.srcElement.selectedOptions[0].accessKey;
          dgApp.pgpMdl = pgpArray[idx];
          storage.setItem('formIdx', idx);
        });
        document.getElementById('studentSelect').addEventListener('change', function(e){
          var idx = e.srcElement.selectedOptions[0].accessKey;
          dgApp.pgpMdl = pgpArray[idx];
          storage.setItem('formIdx', idx);
        });
      }

    }, token);
  }
};