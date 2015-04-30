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

function validateResourceTopicArray(ary){
  var valid = 'Please select at least one topic to save a new resource';
  if (ary.length > 0) {
    valid = '';
  }
  return valid;
}

dgClientValidate.validateResource = function (resourceObj){
  var errorObj = {title:[], description:[], resourceLink:[], resourceTopics:[]};
  var validate = validateTitleTextLength(resourceObj.title);
  if (validate.length > 0) {
    errorObj.title.push(validate);
  }
  validate = validateTitleCharacters(resourceObj.title);
  if (validate.length > 0) {
    errorObj.title.push(validate);
  }

  validate = validateResourceTopicArray(resourceObj.topics);
  if (validate.length > 0) {
    errorObj.title.push(validate);
  }

  return errorObj;
};

module.exports = function (app) {
  app.dgClientValidate = dgClientValidate;
};