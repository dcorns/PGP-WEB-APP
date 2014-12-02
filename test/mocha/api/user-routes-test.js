/**
 * Created by dcorns on 11/30/14.
 */
'use strict';
var corngoose = require('../../../api/js/corngoose');
var dbutils = require('../../../api/js/dbutils');
require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var validatedUser = {email: 'bob@hope.com', password: '123456', firstName: 'Bob', lastName: 'Hope'};
describe('New User Account Setup', function(){
  it('should validate user input', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/users')
      .req(function (req) {
        req.send({email: 'notright', password: '12345', firstName: 'x', lastName: 'y'});
      })
      .res(function (res) {
        expect(res.body).not.to.be.null;
        expect(res.body).to.have.property('firstNameLength');
        expect(res.body.firstNameLength).to.eq('First name must be at least 2 characters long');
        expect(res.body).to.have.property('lastNameLength');
        expect(res.body.lastNameLength).to.eq('Last name must be at least 2 characters long');
        expect(res.body).to.have.property('email');
        expect(res.body.email).to.eq('Not a valid email address!');
        expect(res.body).to.have.property('passwordLength');
        expect(res.body.passwordLength).to.eq('Password must be at least 6 characters long');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should add new user when input is valid', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/users')
      .req(function (req) {
        req.send(validatedUser);
      })
      .res(function (res) {
        expect(res.body).not.to.be.null;
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.eq('New user '+ validatedUser.email + ' added.');
        expect(res).to.have.status(201);
        done();
        corngoose.dbDocRemove({email: 'bob@hope.com'}, 'users', function(err, result){
        });
      });
  });
  it('should not allow duplicate email to be saved', function(done) {
    var db = dbutils(validatedUser);
    db.addNewUser(function(err, data){
    });
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/users')
      .req(function (req) {
        req.send(validatedUser);
      })
      .res(function (res) {
        expect(res.body).not.to.be.null;
        expect(res.body).to.eq('Key Object already exists in database');
        expect(res).to.have.status(500);
        done();
        corngoose.dbDocRemove({email: 'bob@hope.com'}, 'users', function(err, result){
        });
      });
  });
});


