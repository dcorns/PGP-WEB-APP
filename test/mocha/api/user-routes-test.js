/**
 * Created by dcorns on 11/30/14.
 */
'use strict';
require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
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
});
//it('should be able to get', function(done) {
//chai.request('http://localhost:3000')
//  .get('/api/v_0_0_1/notes')
//  .res(function(res) {
//    expect(res).to.have.status(200);
//    expect(Array.isArray(res.body)).to.be.true;
//    expect(res.body[0]).to.have.property('noteBody');
//    done();
//  });
//});

//it('gets a single note', function(done) {
//  chai.request('http://localhost:3000')
//    .get('/api/v_0_0_1/notes/' + id)
//    .res(function(res) {
//      expect(res).to.have.status(200);
//      expect(res.body.noteBody).to.eql('my new note');
//      expect(res.body._id).to.eql(id);
//      done();
//    });
//});
//
//it('updates a note', function(done) {
//  chai.request('http://localhost:3000')
//    .put('/api/v_0_0_1/notes/' + id)
//    .req(function(req) {
//      req.send({'noteBody': 'an updated note'});
//    })
//    .res(function(res) {
//      expect(res).to.have.status(202);
//      expect(res.body.noteBody).to.eql('an updated note');
//      done();
//    });
//});
//
//it('deletes a note', function(done) {
//  chai.request('http://localhost:3000')
//    .del('/api/v_0_0_1/notes/' + id)
//    .res(function(res) {
//      expect(res).to.have.status(200);
//      expect(res.body.msg).to.eql('deleted');
//      done();
//    });
//});


