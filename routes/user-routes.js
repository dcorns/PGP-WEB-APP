/**
 * Created by dcorns on 10/2/14.
 */
'use strict';
var User = require('../models/user');
var auth = require('../api/js/authorize');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/users';

  app.get(baseUrl, function(req, res){
    User.find({}, function(err, users) {
      if (err) return res.status(500).json(err);
      return res.json(users);
    });
  });
//New Account setup
  app.post(baseUrl, function(req, res) {
    var user = new User(req.body);
    user.roll = 'student';
    user.email = user.email.toLowerCase();
    var a = auth(user);
    a.encrypt(function(usr){
      user.save(function(err, usr) {
        if (err) return res.status(500).json(err);
        return res.json(user);
      });
    });

  });

  app.get(baseUrl + '/:id', function(req, res) {
    User.findOne({'_id': req.params.id}, function(err, user) {
      if (err) return res.status(500).json(err);
      return res.json(user);
    });
  });

  app.put(baseUrl + '/:id', function(req, res) {
    var user = req.body;
    delete user._id;
    User.findOneAndUpdate({'_id': req.params.id}, user, function(err, resUser) {
      if (err) return res.status(500).json(err);
      return res.status(202).json(resUser);
    });
  });

  app.delete(baseUrl + '/:id', function(req, res) {
    User.remove({'_id': req.params.id}, function(err, resUser) {
      if (err) return res.status(500).json(err);
      return res.status(200).json({'msg': 'deleted'});
    });
  });
};