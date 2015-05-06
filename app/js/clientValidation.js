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