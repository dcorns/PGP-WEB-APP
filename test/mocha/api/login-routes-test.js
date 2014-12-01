require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var pwd = '123456',
  taCredentials = {email: 'drcorns@hotmail.com', password: pwd},
  studentCredentials = {email: 'john@wayne.com', password: pwd},
  adminCredentials = {email: 'bill@gates.com', password: pwd};
describe('login-routes authentication and authorization', function() {

  it('rejects invalid email addresses', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send({email: 'fake@hotmail', password: '123456'});
      })
      .res(function (res) {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('email');
        expect(res.body.email).to.eql('Not a valid email address!');
        done();
      });
  });

  it('rejects a short password', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send({email: 'fake@hotmail.com', password: '456'});
      })
      .res(function (res) {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('passwordLength');
        expect(res.body.passwordLength).to.eql('There is a problem with your password');
        done();
      });
  });

  it('rejects unregistered emails', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send({email: 'fake@hotmail.com', password: '456345'});
      })
      .res(function (res) {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.eql('The email you entered is not a registered user');
        done();
      });
  });

  it('rejects invalid passwords', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send({email: 'drcorns@hotmail.com', password: '456345'});
      })
      .res(function (res) {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.eql('The password you entered failed authentication');
        done();
      });
  });

  it('creates a token for authenticated credentials', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send(studentCredentials);
      })
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user.atoken).to.be.truthy;
        done();
      });
  });

  it('returns the survey/pgp(note) data for valid student roll credentials', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send(studentCredentials);
      })
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user.roll).to.eq('student');
        expect(res.body).to.have.property('note');
        expect(res.body.note.student).to.eq(res.body.user.email);
        done();
      });
  });

  it('returns null survey/pgp data for valid ta roll credentials', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send(taCredentials);
      })
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user.roll).to.eq('ta');
        expect(res.body).to.have.property('note');
        expect(res.body.note).to.eq(null);
        done();
      });
  });

  it('returns null survey/pgp data for valid admin roll credentials', function (done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/login')
      .req(function (req) {
        req.send(adminCredentials);
      })
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user.roll).to.eq('admin');
        expect(res.body).to.have.property('note');
        expect(res.body.note).to.eq(null);
        done();
      });
  });
});