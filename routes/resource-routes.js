/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var Resource = require('../models/resource');
var db = require('../api/js/dbutils');
var auth = require('../api/js/authorize');
var User = require('../models/user');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/resources';

  app.get(baseUrl, function (req, res) {
    Resource.find({}, function (err, rsrc) {
      if (err) return res.status(500).json(err);
      var dbs = db(rsrc);
      dbs.addNames(function(err, rdata){
        if (err) return res.status(503).json(err);
        return res.status(200).json(rdata);
      });
    });
  });

  app.get(baseUrl + '/:id', function (req, res) {
    Note.findOne({'_id': req.params.id}, function (err, note) {
      if (err) return res.status(500).json(err);
      return res.json(note);
    });
  });

  app.post(baseUrl, function (req, res) {
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);
    a.getTokenInfo(function(usr){
      console.log('rr32'); console.dir(usr);
      req.body.resource.addedBy = usr._id;
      var ntsUtil = db(req.body);
      ntsUtil.pushResource(function (err, rd) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rd);
      });
      return res.status(502);

    }, token);


  });

  //Delete Resource
  app.put(baseUrl, function (req, res) {
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);
    a.getTokenInfo(function(usr){
      if(usr._id == req.body.resource.addedBy){
        var ntsUtil = db(req.body);
        ntsUtil.spliceResource(function(err, rd){
          if (err) return res.status(502).json(err);
          return res.status(200).json(rd);
        });
      }
      else{
        return res.status(500).json({error: 'Resource can only be removed by creator'});
      }
    }, token);
  });

};