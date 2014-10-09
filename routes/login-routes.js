/**
 * Created by dcorns on 10/4/14.
 */
'use strict';
var User = require('../models/user');
var auth = require('../api/js/authorize');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/login';

  app.get(baseUrl, function(req, res){
    User.find({}, function(err, users) {
      if (err) return res.status(500).json(err);
      return res.json(users);
    });
  });

  //Login
  app.post(baseUrl, function(req, res) {
    console.log('login-routes(20)');
    req.body.email = req.body.email.toLowerCase();
    console.log(req.body);
    var a = auth(req.body);
    a.authenticate(function(usr){
      if(usr.user && usr.password){
        a.makeToken(function(usr){
          return res.status(200).json(usr);
        });
      }
      else{
        return res.status(500).json(usr);
      }
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
    User.findOneAndUpdate({'_id': req.params.id}, note, function(err, resUser) {
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
