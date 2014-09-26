var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  name: String,
  course: String,
  rtg1: String,
  rtg2: String,
  rtg3: String,
  note: String,
  goal: String,
  rec1: String,
  rec2: String,
  rec3: String,
  feedbk: String
});

module.exports = mongoose.model('Note', noteSchema);
