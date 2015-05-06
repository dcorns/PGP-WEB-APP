var Note = require('../models/note');
var User = require('../models/user');
var auth = require('../js/authorize');
var db = require('../js/dbutils');
var corngoose = require('../js/corngoose');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/pgps';

  app.get(baseUrl, function (req, res) {
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);
    a.getTokenInfo(token, function (err, usr) {
      if(err){
        return res.status(500).json(err);
      }
      if (typeof token !== 'undefined') {
        if (usr.roll === 'ta' || usr.roll === 'admin') {
          corngoose.getCollection('notes', function(err, notes){
            if(err){
              if (err) return res.status(500).json(err);
            }
            var ntsUtil = db(notes);
            ntsUtil.combineUsers(function (err, rd) {
              if (err) return res.status(502).json(err);
              var payload = {u: usr, n: rd};
              return res.status(200).json(payload);
            });
            return res.status(503);
          });
        }
      }
      else {
        return res.status(202).send(token);
      }
    });
  });

  //app.get(baseUrl + '/:id', function (req, res) {
  //  Note.findOne({'_id': req.params.id}, function (err, note) {
  //    if (err) return res.status(500).json(err);
  //    return res.json(note);
  //  });
  //});

  //save or update pgp
  //app.put(baseUrl + '/:id', function (req, res) {
  //  var note = req.body;
  // // delete note._id;
  //  var user = {};
  //  var token = req.headers.authorization;
  //  var a = auth(user);
  //  a.getTokenInfo(token, function (err, usr) {
  //    if(err){
  //      return res.status(500).json(err);
  //    }
  //      a.authorizePgpEdit(usr, note._id, function (err, authorized){
  //        if(err) return res.status(500).json(err);
  //        if (authorized){
  //          note.ta = usr.email;
  //          corngoose.dbDocReplace(note, 'notes', function(err, result){
  //            if(err || !result) {
  //              console.error(err);
  //              return res.status(500).json(err);
  //            }
  //            return res.status(202).json(result);
  //          });
  //        }
  //        else{
  //          return res.status(401).json('Only creator or admin can save pgp changes');
  //        }
  //      });
  //    });
  //});

  //app.delete(baseUrl + '/:id', function (req, res) {
  //  Note.remove({'_id': req.params.id}, function (err, resNote) {
  //    if (err) return res.status(500).json(err);
  //    return res.status(200).json({'msg': 'deleted'});
  //  });
  //});


};
