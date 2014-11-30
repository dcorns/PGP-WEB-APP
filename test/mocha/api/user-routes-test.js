/**
 * Created by dcorns on 11/30/14.
 */
'use strict';
require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
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


