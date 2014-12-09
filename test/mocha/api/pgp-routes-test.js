/**
 * Created by dcorns on 12/7/14.
 */
'use strict';
var Note = require('../../../api/models/note');
var User = require('../../../api/models/user');
var auth = require('../../../api/js/authorize');
var db = require('../../../api/js/dbutils');
var corngoose = require('../../../api/js/corngoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('get responses for /api/v_0_0_1/pgps', function(){
  chai.request('http://localhost:3000')
    .get('/api/v_0_0_1/pgps')
    .set('authorization','testToken')
    .send()
    .end(function(err, res){
      expect(token).to.eql('testToken');
    });

});

