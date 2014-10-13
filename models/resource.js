/**
 * Created by dcorns on 10/12/14.
 */
'use strict';

var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
  //area of discipline
  resourceFor: String,
  //Array to contain {type: 'book, website, etc', rlink: link to resource}
  resource:[]
});

module.exports = mongoose.model('Resource', resourceSchema);