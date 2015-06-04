/**
 * controllerRegistry
 * Created by dcorns on 5/26/15.
 * modules required in this file are specifically for associated views. The property names should be equal to the associated html file name which is equal to the associated js file name used with the path as the argument to the require statement which is the value of the property. This file is used by router.js to invoke the java script when the matching view is loaded.
 */
'use strict';
module.exports = function (){
  return{
    home: require('./home'),
    login: require('./login')
  };
};