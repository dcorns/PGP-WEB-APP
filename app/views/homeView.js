/**
 * homeView
 * Created by dcorns on 3/13/15.
 */
'use strict';

var ui = require('../js/ui');
module.exports = function(){
  var ux = ui();
  ux.hideMainButtons();
  //Create View
  document.getElementById('dgView').innerHTML = '';
  var title = 'artHome';
  ux.addTag('dgView', 'article', title);
  ux.addTextTag(title, 'p', 'Congratulations, you\'ve made it to the end of our Foundations of CS and Web Development course! I truly hope it has been a rewarding experience for you, and encourage you to continue to spend as much time as you can honing and further developing your coding powers.');
  ux.addTextTag(title, 'p', 'To help us give you the best guidance on where to go from here, please tell us a little about how strongly you are feeling about the various topics we covered, and what your longer-term goals are. Your TA will share some feedback and favorite resources you can use to keep you learning on your own time.');
  ux.addTextTag(title, 'p', 'It\'s been a great honor to travel this stretch of the journey with you. I wish you the best with all that this path leads you towards!');
  ux.addTextTag(title, 'p', '—Brook');
};