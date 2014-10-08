var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  name: String,
  ta: String,
  student: String,
  course: String,
  rtg1: String,
  rtg2: String,
  rtg3: String,
  rtg4: String,
  rtg5: String,
  rtg6: String,
  rtg7: String,
  note: String,
  goal: String,
  goal2: String,
  goal3: String,
  goal4: String,
  goal5: String,
  rec1: String,
  rec2: String,
  rec3: String,
  rec4: String,
  rec5: String,
  rec6: String,
  rec7: String,
  feedbk: String,
  rtgcomplete: Boolean,
  recComplete: Boolean
});

module.exports = mongoose.model('Note', noteSchema);
