/**
 * clientValidation
 * Created by dcorns on 4/28/15.
 * single value validations return an empty string if valid, otherwise they return an error message string
 * multi-value validations recieve an object and return an empty array if valid, otherwise they return an array of objects of the form {property: ['error message']}
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

dgClientValidate.validateResource = function (resourceObj){
  var errorArray = [];
  var validate = validateTitleTextLength(resourceObj.title);
  if (validate.length > 0) {
    errorArray.push({title:[validate]});
  }
  validate = validateTitleCharacters(resourceObj.title);
  if (validate.length > 0) {
    if(errorArray[0]) errorArray[0].title.push(validate);
    else errorArray.push({title:[validate]});
  }
  return errorArray;
};

module.exports = function (app) {
  app.dgClientValidate = dgClientValidate;
};