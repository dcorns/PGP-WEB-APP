var Note = require('../models/note');
var User = require('../models/user');
var auth = require('../api/js/authorize');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function(req, res){
    var user = {};
    var token = req.headers.authorization;
    var a = auth(user);
    a.getTokenInfo(function(usr){
      console.log('note-routes(13)');
      console.log('token in: '+token);
      console.dir(usr);
      console.log('role = '+usr.roll);
      if(usr.roll === 'ta'){

        Note.find({}, function(err, notes) {
          if (err) return res.status(500).json(err);
          return res.json(notes);
        });
      }
      else {
        if (usr.roll === 'student') {
          Note.findOne({student: usr.email}, function (err, note) {
            if (err) return res.status(500).json(err);
            if (note) {
              return res.json(note);
            }
            else {
              return res.json({});
            }

          })
        }
      }
    }, token);
  });

  app.post(baseUrl, function(req, res) {
    console.log(req.body);
    var token = req.headers.authorization;
    var user = {};
    var a = auth(user);
    a.getTokenInfo(function(usr){

    }, token);
    var note = new Note(req.body);
    note.save(function(err, resNote) {
      if (err) return res.status(500).json(err);
      return res.send(resNote);
    });
  });

  app.get(baseUrl + '/:id', function(req, res) {
    Note.findOne({'_id': req.params.id}, function(err, note) {
      if (err) return res.status(500).json(err);
      return res.json(note);
    });
  });

  app.put(baseUrl + '/:id', function(req, res) {
    var note = req.body;
    delete note._id;
    Note.findOneAndUpdate({'_id': req.params.id}, note, function(err, resNote) {
      if (err) return res.status(500).json(err);
      return res.status(202).json(resNote);
    });
  });

  app.delete(baseUrl + '/:id', function(req, res) {
    Note.remove({'_id': req.params.id}, function(err, resNote) {
      if (err) return res.status(500).json(err);
      return res.status(200).json({'msg': 'deleted'});
    });
  });

};
