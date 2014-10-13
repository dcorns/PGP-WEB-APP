/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var Resource = require('../models/resource');
var db = require('../api/js/dbutils');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/resources';

  app.get(baseUrl, function(req, res){
    Resource.find({}, function(err, rsrc){
      if(err) return res.status(500).json(err);
      console.log('rr(14)');
      console.log(rsrc);
      return res.status(200).json(rsrc);
    });
  });

  app.get(baseUrl + '/:id', function(req, res) {
    Note.findOne({'_id': req.params.id}, function(err, note) {
      if (err) return res.status(500).json(err);
      return res.json(note);
    });
  });

  app.post(baseUrl, function(req, res) {
    var ntsUtil = db(req.body);
    ntsUtil.pushResource(function(err, rd){
      if (err) return res.status(500).json(err);
      console.log('rr31');
      console.log(req.body);
      console.log(rd);
      return res.status(200).json(rd);
    });
    return res.status(502);

  });

};