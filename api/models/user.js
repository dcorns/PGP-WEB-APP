/**
 * Created by dcorns on 10/2/14.
 */
'use strict';
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  roll: String,
  atoken: String
});

module.exports = mongoose.model('User', userSchema);