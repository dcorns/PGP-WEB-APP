var Note = require('../models/note');
var User = require('../models/user');
var auth = require('../js/authorize');
var db = require('../js/dbutils');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function (req, res) {
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);

    a.getTokenInfo(function (usr) {
      if (typeof token !== 'undefined') {
        if (usr.roll === 'ta') {
          Note.find({}, function (err, notes) {
            if (err) return res.status(500).json(err);
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
    }, token);
  });

  app.get(baseUrl + '/:id', function (req, res) {
    Note.findOne({'_id': req.params.id}, function (err, note) {
      if (err) return res.status(500).json(err);
      return res.json(note);
    });
  });

  //save or update pgp
  app.put(baseUrl + '/:id', function (req, res) {
    var note = req.body;
    delete note._id;
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);
    a.getTokenInfo(function (usr) {
      note.ta = usr.email;
      console.log('nr(95)');
      console.log(usr);
      console.log(note);
      Note.findOneAndUpdate({'_id': req.params.id}, note, function (err, resNote) {
        if (err) return res.status(500).json(err);
        return res.status(202).json(resNote);
      });
    }, token);

  });

  app.delete(baseUrl + '/:id', function (req, res) {
    Note.remove({'_id': req.params.id}, function (err, resNote) {
      if (err) return res.status(500).json(err);
      return res.status(200).json({'msg': 'deleted'});
    });
  });



};
