/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var Resource = require('../models/resource');
var db = require('../api/js/dbutils');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/resources';

  app.get(baseUrl, function(req, res){

  });

  app.post(baseUrl, function(req, res) {
    console.log('rr(15)');
    console.log(req.body);
    var ntsUtil = db(req.body);
    ntsUtil.pushResource(function(err, rd){
      if (err) return res.status(500).json(err);
      console.log(rd);
      return res.status(200).json(rd);
    });
    return res.status(502);

  });

};